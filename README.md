# Nic Neumann Photography — website

## Publish (GitHub → Netlify)
1. Create a new GitHub repo and upload everything in this folder (index.html at the top level).
2. In Netlify: Add new site → Import an existing project → GitHub → pick the repo. Leave build command empty, publish directory `/`. Deploy.
3. Netlify → Site configuration → Forms → enable form detection, then redeploy once. The "inquiry" form will appear under Forms.
4. Forms → Form notifications → Add notification → Email → hello@nicneumannphoto.com.
5. Domain management → Add domain → nicneumannphoto.com, then update DNS at your registrar as Netlify instructs.

## After launch
- Submit a test inquiry and confirm the email arrives.
- Availability calendar link for clients: https://nicneumannphoto.com/#availability
- Make sure the Google Calendar is public (free/busy is enough).

## Updating photos
Replace files in /photos keeping the same names, or edit gallery-data.js.
