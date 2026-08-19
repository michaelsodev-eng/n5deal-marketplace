import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { ParsedRegisterInput } from "@/lib/register-form";

export async function registerUser(
  input: ParsedRegisterInput,
): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });

  if (existing) {
    return { ok: false, error: "Користувач із таким email уже існує." };
  }

  const password = await bcrypt.hash(input.password, 10);

  const user = await prisma.user.create({
    data:
      input.role === "BUYER"
        ? {
            email: input.email,
            password,
            role: "BUYER",
            buyerProfile: {
              create: {
                companyName: input.companyName,
                investmentTypes: [],
                industries: [],
                countries: [],
              },
            },
          }
        : {
            email: input.email,
            password,
            role: "SELLER",
            sellerProfile: {
              create: {
                companyName: input.companyName,
              },
            },
          },
    select: { id: true },
  });

  return { ok: true, userId: user.id };
}
