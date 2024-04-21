import { google } from "googleapis";
import emailStructure from "./emailStructure";
const nodemailer = require("nodemailer");

async function createTransport() {
  const OAuth2 = google.auth.OAuth2;
  
  google.options({
    http2: true,
  });
  const email: string = process.env.OAUTH_EMAIL as string;
  const clientSecret: string = process.env.OAUTH_CLIENT_SECRET as string;
  const clientID: string = process.env.OAUTH_CLIENTID as string;
  const refreshToken: string = process.env.OAUTH_REFRESH_TKN as string;

  const client = new OAuth2(
    clientID,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );
  client.setCredentials({
    refresh_token: refreshToken,
  });
  const accessToken = await new Promise((resolve, reject) => {
    client.getAccessToken((err, res) => {
      if (err) {
        console.log(err);
        reject(new Error("Error, failed to generate token."));
      }
      resolve(res);
    });
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      accessToken,
      type: "OAuth2",
      user: email,
      clientId: clientID,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  return transporter;
}

export default async function (otp: number, email: string): Promise<void> {
  try {
    const transporter = await createTransport();
    transporter.sendMail({
      subject: "OTP Verification - Scrape.io Web Scraper",
      text: "OTP",
      to: email,
      from: process.env.OAUTH_EMAIL,
      html: emailStructure(otp),
    });
  } catch (err) {
    console.log(err);
  }
}
