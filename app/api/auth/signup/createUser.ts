import { PrismaClient } from "@prisma/client/extension";
import { encryption } from "../../utils/encryption";

export default async function createUser(
  email: string,
  password: string,
  prisma: PrismaClient,
  otp: number
) {
  const hashedPassword = await encryption(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      isVerified: false,
      otp: {
        create: {
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
          code: otp,
        },
      },
    },
  });

  return user;
}
