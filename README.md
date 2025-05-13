# Mirth

The source code repository of Mirth, a web-based real-time one-to-one chat app.

## Running the App Locally
To run the backend locally:
1. Run `npm i` in the root directory to install the dependencies.
2. Run `npm run server` to run the backend code at `localhost:5000`.

To run the frontend:
1. Run `npm i` in `./frontend/` (not just at the root directory!) to install the dependencies.
2. Run `npm run dev` to start the frontend locally at `localhost:3000`.
3. Access `localhost:3000` on a web browser.

If deployed locally, both the server-side(backend) and client-side(frontend) code have to be run on the same localhost, with the server on port 5000. Please do not change the port number of the server.

However, the database (MongoDB) is hosted online. You can change which database to connect to by modifying `MONGO_DB_URI` in the `.env` file located at the root directory.

## How to Use
1. Generate a license key at the `/license` page. You can navigate there by first going to the `/signup` page by clicking `Don't have an account?` and then clicking `Generate License`. The max devices and expires in days fields can be any positive integers and the license key should work. Copy the generated key.
2. Go back to the `/signup` page. Enter your user details and paste the license key. Click `Sign Up`.
3. You should be taken directly to the main chatting page. You can log in later in another browser using the correct username and password.
4. Search for a registered user with the search bar in the top left to start a conversation. Once a conversation is selected, type your text message in the bar at the bottom and press Enter or click the send button.
5. To change your account settings, click the gear button in the top right, which takes you to the `/settings` page. Enter the details you wish to change and hit `Update Account`. If you wish to delete your account, hit `Delete Account`.
6. To log out, press the door button in the top right of the page. 

## Core Features
- Real-time one-to-one text messaging
- Retrieve chat history (messages are stored in the database)
- View others' online status
- Notification sound on new message
- Search registered users to start a conversation
- Change your account details (username, full name, password, profile picture(with a direct link), gender)
- Delete user account