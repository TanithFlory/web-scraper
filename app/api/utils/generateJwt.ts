import { JwtPayload } from "@/types";
import jwt from "jsonwebtoken";

export default function generateJwt(payload: JwtPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}
