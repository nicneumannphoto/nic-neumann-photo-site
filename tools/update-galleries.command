#!/bin/bash
# Double-click this file to update the photo lists on the website.
#
# It looks in photos/weddings, photos/families, photos/seniors, photos/headshots and
# photos/couples, then updates gallery-data.js so that:
#   - new photos you added are appended to the end of that gallery
#   - photos you deleted are removed from the list
#   - everything else (order, covers, hero, reel) stays exactly as it was
# It never touches the photos themselves. After it runs, open GitHub Desktop to review
# the change, then commit and push.

cd "$(dirname "$0")/.." || exit 1

if ! command -v perl >/dev/null 2>&1; then
  echo "This script needs perl, which normally comes with your Mac. Ask Claude for help."
  read -n 1 -s -r -p "Press any key to close this window..."
  exit 1
fi

perl <<'PERL'
use strict;
use warnings;
use JSON::PP;

my $file = 'gallery-data.js';
open(my $in, '<:encoding(UTF-8)', $file) or die "Can't open $file. Run this from inside the website folder.\n";
my $text = do { local $/; <$in> };
close $in;

my $json;
if ($text =~ /=\s*(\{.*\})\s*;?\s*$/s) { $json = $1 } else { die "Couldn't find the gallery list inside $file.\n" }
my $data  = JSON::PP->new->decode($json);
my $coder = JSON::PP->new;    # compact, the same style as the existing file

sub natkey { my $s = lc shift; $s =~ s/(\d+)/sprintf('%010d', $1)/ge; return $s }

my @galleries = qw(weddings families seniors headshots couples);
my (@notes, @warnings);
my ($added, $removed) = (0, 0);

for my $cat (@galleries) {
  my $dir = "photos/$cat";
  unless (-d $dir) { push @warnings, "Folder $dir is missing, skipped."; next }

  opendir(my $dh, $dir) or die "Can't read $dir\n";
  my @files = sort { natkey($a) cmp natkey($b) } grep { !/^\./ && /\.(jpe?g|png|webp)$/i && -f "$dir/$_" } readdir $dh;
  closedir $dh;

  my %ondisk = map { ("$dir/$_" => 1) } @files;
  my @old    = @{ $data->{$cat} || [] };
  my %inlist = map { $_ => 1 } @old;

  my @keep = grep {  $ondisk{$_} } @old;
  my @gone = grep { !$ondisk{$_} } @old;
  my @new  = map { "$dir/$_" } grep { !$inlist{"$dir/$_"} } @files;

  for my $f (@files) {
    if ($f =~ /[^A-Za-z0-9._-]/) { push @warnings, "$dir/$f has spaces or special characters in its name. Rename it (letters, numbers, dashes only) and run this again." }
    my $size = -s "$dir/$f";
    if ($size > 1_000_000) { push @warnings, sprintf("%s/%s is %.1f MB. Photos should be under 1 MB; export it at a lower quality.", $dir, $f, $size / 1_000_000) }
  }

  next unless @gone || @new;
  my $arr = $coder->encode([ @keep, @new ]);
  $text =~ s/("\Q$cat\E"\s*:\s*)\[[^\]]*\]/$1 . $arr/e or die "Couldn't find the \"$cat\" list in $file.\n";
  $added   += @new;
  $removed += @gone;
  push @notes, sprintf("%-10s +%d new, -%d removed  (now %d photos)", $cat, scalar(@new), scalar(@gone), scalar(@keep) + scalar(@new));
  push @notes, "           new: $_" for @new;
  push @notes, "       removed: $_" for @gone;
}

# Check the pages that are picked by hand (covers, hero, reel, cta) still exist.
my @pinned;
push @pinned, values %{ $data->{covers} || {} };
push @pinned, @{ $data->{hero} || [] }, @{ $data->{reel} || [] };
push @pinned, $data->{cta} if defined $data->{cta};
for my $p (@pinned) {
  next unless defined $p && $p =~ m{^photos/};
  push @warnings, "A cover, hero, reel or CTA entry points to $p, which doesn't exist." unless -e $p;
}

# Remember which photos are used on the home page (covers + "Lately" strip) so the shell step below can make mid-size copies.
if (open(my $pf, '>', '/tmp/nnp-pinned.txt')) {
  my %seen;
  print $pf "$_\n" for grep { defined $_ && m{^photos/} && !$seen{$_}++ } (values %{ $data->{covers} || {} }, @{ $data->{reel} || [] });
  close $pf;
}

print "\n";
if ($added || $removed) {
  open(my $out, '>:encoding(UTF-8)', $file) or die "Can't write $file\n";
  print $out $text;
  close $out;
  print "Updated $file\n\n";
  print "  $_\n" for @notes;
  print "\nAdded $added, removed $removed.\n";
  print "Next: open GitHub Desktop, look over the change, write a short message, Commit to main, then Push origin.\n";
} else {
  print "Everything is already up to date. No changes made.\n";
}
if (@warnings) {
  print "\nHeads up:\n";
  print "  - $_\n" for @warnings;
}
print "\n";
PERL

# Make small thumbnails for the gallery contact sheets (and mid-size copies for the home page). Only ones that don't exist yet.
# (The site falls back to the full-size photo if one is missing, just slower.)
if command -v sips >/dev/null 2>&1; then
  made=0
  for cat in weddings families seniors headshots couples; do
    [ -d "photos/$cat" ] || continue
    mkdir -p "photos/thumbs/$cat"
    for f in photos/$cat/*.[jJ][pP][gG] photos/$cat/*.[jJ][pP][eE][gG]; do
      [ -f "$f" ] || continue
      t="photos/thumbs/$cat/$(basename "$f")"
      if [ ! -f "$t" ]; then
        sips -Z 480 -s format jpeg -s formatOptions 72 "$f" --out "$t" >/dev/null 2>&1 && made=$((made + 1))
      fi
    done
  done
  echo "Made $made new thumbnail(s) in photos/thumbs."
  madem=0
  if [ -f /tmp/nnp-pinned.txt ]; then
    while IFS= read -r f; do
      [ -f "$f" ] || continue
      m="${f/photos\//photos/med/}"
      if [ ! -f "$m" ]; then
        mkdir -p "$(dirname "$m")"
        sips -Z 1400 -s format jpeg -s formatOptions 80 "$f" --out "$m" >/dev/null 2>&1 && madem=$((madem + 1))
      fi
    done < /tmp/nnp-pinned.txt
  fi
  echo "Made $madem new mid-size copy/copies in photos/med."
else
  echo "Couldn't make thumbnails (sips not found). The site will still work, just load photos slower."
fi

echo
read -n 1 -s -r -p "Press any key to close this window..."
echo
