import { google } from "googleapis";

export default function oAuth2Client() {
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const clientID = process.env.OAUTH_CLIENTID;
  const redirect = "http://localhost:3000/api/auth/google-auth/callback";

  return new google.auth.OAuth2(clientID, clientSecret, redirect);
}
