/*
 * alt-text.js — descriptive alt text for gallery photos (helps image search + screen readers).
 *
 * window.nnpAlt(src, index) returns the alt text for a photo path like "photos/weddings/weddings-018.jpg".
 * - Photos listed in NNP_ALT below get their own description.
 * - Any photo NOT listed (for example, ones you add later) falls back to a sensible category label,
 *   so nothing ever breaks when you run tools/update-galleries.command.
 *
 * To describe a new photo: add a line  "photos/weddings/weddings-073.jpg": "Short, plain description of what's in the photo",
 * Keep it to what you can SEE (people, place, moment). No keyword stuffing.
 */
(function () {
  var NNP_ALT = {
    // ---- Weddings ----
    "photos/weddings/weddings-001.jpg": "Bride and groom exchange rings during an outdoor ceremony as the officiant looks on",
    "photos/weddings/weddings-003.jpg": "Bride and groom in a peach suit hold hands beside a rushing mountain creek under willow trees",
    "photos/weddings/weddings-004.jpg": "Bride playfully touches her husband's nose while they share dessert in a glass-roofed train car",
    "photos/weddings/weddings-005.jpg": "Wedding day details flat lay with heels, invitation, rings, bow tie and a mirror disco ball",
    "photos/weddings/weddings-006.jpg": "Black and white photo of a bride and groom holding hands during their ceremony by a bright window",
    "photos/weddings/weddings-007.jpg": "Groom laughing as he is carried in his friend's arms on a grassy hillside with red rocks behind",
    "photos/weddings/weddings-008.jpg": "Bride and groom standing together on a rocky shoreline at sunset with a bridge in the distance",
    "photos/weddings/weddings-009.jpg": "Bride and groom hold hands under a draped wooden arch during an outdoor hilltop ceremony",
    "photos/weddings/weddings-010.jpg": "Black and white photo of groomsmen in bow ties laughing and holding drinks before the ceremony",
    "photos/weddings/weddings-011.jpg": "Bridesmaids in deep green dresses gather as the bride's long veil trails across a stone overlook",
    "photos/weddings/weddings-012.jpg": "Couple embracing on the steps of a historic brick building in front of tall black doors",
    "photos/weddings/weddings-014.jpg": "Vintage watch resting on an open handwritten vow book atop a log",
    "photos/weddings/weddings-015.jpg": "Black and white photo of a bride feeding her groom a bite of wedding cake at a table overlooking the plains",
    "photos/weddings/weddings-016.jpg": "Nine groomsmen in black tuxedos standing in a line in front of a brick and glass building",
    "photos/weddings/weddings-017.jpg": "Groom wipes away tears while reading private vows to his bride during a first look in the pine forest",
    "photos/weddings/weddings-018.jpg": "Bride and groom read handwritten vows to each other in a sunlit evergreen forest",
    "photos/weddings/weddings-019.jpg": "Bride and four bridesmaids in burgundy dresses link arms facing a river and mountains",
    "photos/weddings/weddings-020.jpg": "Couple embracing in a golden meadow beneath autumn cottonwood trees",
    "photos/weddings/weddings-021.jpg": "Bride and groom touch foreheads in a quiet moment among green trees",
    "photos/weddings/weddings-022.jpg": "Bride in white pajamas laughs with her bridesmaids in black robes while getting ready",
    "photos/weddings/weddings-023.jpg": "Smiling bride and groom hold hands with snowy ski slopes visible in the mountains behind them",
    "photos/weddings/weddings-024.jpg": "Bride smiles as her groom and officiant stand together during an outdoor pine-forest ceremony",
    "photos/weddings/weddings-025.jpg": "Bride and groom hold hands under a floral arch with palm trees as the officiant reads from a tablet",
    "photos/weddings/weddings-026.jpg": "Bride in a lace gown holding a bouquet, looking out over green foothills and farmland",
    "photos/weddings/weddings-027.jpg": "Bridesmaid helping the bride into her shoes in front of a gold-framed mirror",
    "photos/weddings/weddings-028.jpg": "Black and white portrait of a bride in a patterned lace veil holding a bouquet in a park",
    "photos/weddings/weddings-029.jpg": "Couple holding hands on the steps of a brick building, the bride holding a small bouquet",
    "photos/weddings/weddings-032.jpg": "Groom and bride lean together on a gravel road with red sandstone rocks at sunset",
    "photos/weddings/weddings-033.jpg": "Bride and groom share a kiss on a golf course lawn",
    "photos/weddings/weddings-034.jpg": "Bride and groom embrace and smile beside a mountain lake",
    "photos/weddings/weddings-035.jpg": "Officiant signs the marriage license on a wine barrel beside a welcome sign",
    "photos/weddings/weddings-036.jpg": "Groom twirls his bride on a rocky shoreline at dusk with a mirror-like reflection in the water",
    "photos/weddings/weddings-037.jpg": "Bride and groom in a peach suit exchange vows under a stone and timber arch with sunflowers",
    "photos/weddings/weddings-038.jpg": "Groom kisses his bride on the forehead as she holds a white bouquet beneath a floral arch",
    "photos/weddings/weddings-039.jpg": "Bride laughing as she walks hand in hand with her groom through aspen trees",
    "photos/weddings/weddings-040.jpg": "Black and white photo of the bride and groom exchanging rings with rock formations behind them",
    "photos/weddings/weddings-041.jpg": "Bride and groom kiss as guests raise their hands to cheer after the ceremony",
    "photos/weddings/weddings-042.jpg": "Close-up of a bride and groom kissing beneath the bride's sheer veil",
    "photos/weddings/weddings-043.jpg": "Groom reads his vows in front of six groomsmen during an outdoor ceremony",
    "photos/weddings/weddings-044.jpg": "Bride in a long veil walks toward a stone amphitheater on a mountainside under a cloudy sky",
    "photos/weddings/weddings-045.jpg": "Couple holds hands on a grand staircase while the officiant reads during an intimate ceremony",
    "photos/weddings/weddings-048.jpg": "Bride with her mother, who is wearing a blue dress, holding a colorful bouquet",
    "photos/weddings/weddings-049.jpg": "Black and white photo of a groom in a tuxedo and bride holding hands and walking together",
    "photos/weddings/weddings-050.jpg": "Bride in a lace-sleeved gown kneels to pet a golden retriever wearing a flower collar",
    "photos/weddings/weddings-051.jpg": "Black and white photo of a couple walking hand in hand along a forest creek",
    "photos/weddings/weddings-052.jpg": "Black and white photo of a groom lifting his bride in an embrace beside a creek",
    "photos/weddings/weddings-053.jpg": "Black and white photo of a laughing bride and groom holding up their marriage license",
    "photos/weddings/weddings-054.jpg": "Groom in a gray suit with his smiling bride tucked under his arm among aspen trees",
    "photos/weddings/weddings-055.jpg": "Groom hugs his bride from behind as the sun sets over red rocks on a golf course",
    "photos/weddings/weddings-056.jpg": "Bride and eight bridesmaids in lavender dresses laughing around a large bouquet",
    "photos/weddings/weddings-057.jpg": "Close-up of a smiling bride and groom in front of a stone fireplace",
    "photos/weddings/weddings-058.jpg": "Groom and bride walking away from the camera along a stepping-stone path through a garden",
    "photos/weddings/weddings-059.jpg": "Bridal party in emerald green dresses laughing together among pine trees with a mirror sign",
    "photos/weddings/weddings-060.jpg": "Couple kisses on a staircase in an elegant historic building",
    "photos/weddings/weddings-063.jpg": "Bride and groom smile and hold hands under a rustic wooden arch above rolling hills",
    "photos/weddings/weddings-064.jpg": "Black and white photo of a bride in a flowing dress and groom beside an alpine lake with jagged peaks behind",
    "photos/weddings/weddings-065.jpg": "Bride and groom share a dance under a tented reception with hanging greenery and a checkerboard floor",
    "photos/weddings/weddings-066.jpg": "Wedding party in black standing in a line outside a white building with string lights",
    "photos/weddings/weddings-067.jpg": "Bride and groom smile at the camera and show off their wedding rings",
    "photos/weddings/weddings-068.jpg": "Black and white photo of a bride and groom walking to their sweetheart table beneath a palm tree",
    "photos/weddings/weddings-069.jpg": "Bride and groom posing together beside a white floral arch at a hilltop ceremony site",
    "photos/weddings/weddings-070.jpg": "Couple laughing as they cut a small cake topped with fresh berries",
    "photos/weddings/weddings-071.jpg": "Newlyweds walk up the aisle after the ceremony under string lights as guests applaud",
    "photos/weddings/weddings-072.jpg": "Bride holding a white bouquet and smiling in a sunny aspen grove",

    // ---- Couples & engagements ----
    "photos/couples/IMG_1539.jpg": "Two women in embroidered formal outfits holding hands in front of a brightly painted brewery mural",
    "photos/couples/IMG_3589.jpg": "Engaged couple holding hands and walking past blooming flower beds in front of a historic building",
    "photos/couples/IMG_3722.jpg": "Engagement portrait of a couple snuggling on stone steps in front of a historic building",
    "photos/couples/IMG_4061.jpg": "Couple spinning and laughing hand in hand on a grassy lawn in autumn light",
    "photos/couples/IMG_4129.jpg": "Overhead photo of a smiling couple lying side by side in the grass",
    "photos/couples/IMG_5758.jpg": "Close-up of an engagement ring on a hand resting on her fiancé's checkered shirt in warm sunlight",
    "photos/couples/IMG_7271.jpg": "Couple walking hand in hand through a rocky mountain meadow with snowy peaks behind",
    "photos/couples/IMG_7513.jpg": "Couple kissing against a blue sky with a ring visible on her hand",
    "photos/couples/IMG_8988.jpg": "Two women in bright outfits reaching toward each other in front of pastel painted brick walls",

    // ---- Home page and hero images ----
    "photos/home/home-02.jpg": "Couple standing together on a rocky overlook with Colorado mountains stretching behind them",
    "photos/home/home-03.jpg": "Surprise proposal on a rocky cliff above a mountain lake",
    "photos/home/home-04.jpg": "Older couple sitting on a porch swing surrounded by trees for a family portrait",
    "photos/home/home-05.jpg": "Bride and groom embracing in a field of wildflowers among white aspen trees",
    "photos/hero/breck-9-16-96.jpg": "Young man seated beside a truck in a mountain meadow for a portrait session",
    "photos/hero/c-n-engagement-22-28.jpg": "Engaged couple walking among white sandstone formations",
    "photos/hero/cope22-775.jpg": "Groom wraps his arms around his laughing bride in a sunlit forest",
    "photos/hero/ellis-family-22-38.jpg": "Parents and two children laughing together in front of a weathered red barn door",
    "photos/hero/gavin-sr-58.jpg": "Senior portrait of a smiling young man seated on a rock in golden evening light",
    "photos/hero/jacksonfamily-22-46.jpg": "Extended family gathered in a snowy aspen and pine forest for a winter family portrait",
    "photos/hero/k-r2021-196.jpg": "Bride holding a white bouquet standing in a green mountain meadow",
    "photos/hero/k-r2021-219.jpg": "Smiling groom in a gray suit with a boutonniere seated on stone steps",
    "photos/hero/k-r2021-527.jpg": "Bride and groom kissing while seated on a small wooden bridge",
    "photos/hero/m-c-2022-407.jpg": "Bride and groom kneeling with their two dogs, one wearing a bow tie, in a sunny park",
    "photos/hero/njn-4966.jpg": "Proposal on a rocky ridge in a high mountain valley with the surprised partner covering her face",
    "photos/hero/njn-5767.jpg": "Family of three smiling together in the snow among evergreen trees"
  };

  var FALLBACK = {
    weddings: "Wedding photography by Nic Neumann in Colorado",
    couples: "Couples and engagement photography by Nic Neumann in Colorado",
    families: "Family photography session in Colorado by Nic Neumann",
    seniors: "Senior portrait by Nic Neumann in Colorado",
    headshots: "Professional headshot by Nic Neumann in Colorado",
    hero: "Wedding, couples and family photography by Nic Neumann in Colorado",
    home: "Wedding, couples and family photography by Nic Neumann in Colorado"
  };

  window.nnpAlt = function (src, index) {
    src = String(src || "");
    if (NNP_ALT[src]) return NNP_ALT[src];
    var m = /photos\/([^\/]+)\//.exec(src);
    var base = (m && FALLBACK[m[1]]) || "Photography by Nic Neumann, Denver Colorado";
    return typeof index === "number" ? base + ", photo " + (index + 1) : base;
  };
})();
