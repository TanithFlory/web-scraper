import { JwtPayload } from "@/types";

export default function decodeJwt(jwt: string): JwtPayload | undefined {
  try {
    const parts = jwt.split(".");
    const payload = JSON.parse(atob(parts[1]));

    return payload;
  } catch (error) {
    return undefined;
  }
}
