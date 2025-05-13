# Mirth Frontend

The frontend code of Mirth, a web-based real-time one-to-one chat app.

To run the frontend in a local testing environment:

1. Run `npm i` in this directory (not just at the root directory!) to install the dependencies.
2. Run `npm run dev`.
3. Access `localhost:3000` on a web browser.

If deployed locally, the server-side(backend) code has to be run at `localhost:5000`. Please do not modify the port number of the server.

Currently, there are 5 pages:
- `/`: Home page, main chatting page
- `/settings`: Account settings page
- `/login`: Login page
- `/signup`: Registration page
- `/license`: License key generation

You can navigate between `/` and `/settings` via the button in the navigation bar at the top. Logging out takes the user back to `/login`.
You can navigate between the `/login`, `/signup` and `/license` with the clickable texts (`Don't have an account?`, `Already have an account?`, `Generate License`, `Return to Signup`) on the pages.