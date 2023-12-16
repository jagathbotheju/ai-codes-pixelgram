import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUser = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!user) {
    throw new Error("You must be sign in");
  }

  return user;
};
