import { google } from "googleapis";
import { NextResponse } from "next/server";
import oAuth2Client from "./oAuth2Client";

google.options({
  http2: true,
});

export function GET() {
  const OAuth2Client = oAuth2Client();
  const url = OAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  });
  return NextResponse.json(
    { message: "Successfully generated url", url },
    { status: 201 }
  );
}
