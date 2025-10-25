// lib/env.server.ts
export const env = {
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
  MONGO_DB_URL: process.env.MONGO_DB_URL!,
  UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET!,
  UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID!, // يبقى هنا لأن استعماله عادةً سرفري
};

// فحص مبكّر
if (!env.CLERK_SECRET_KEY) throw new Error("Missing CLERK_SECRET_KEY");
if (!env.MONGO_DB_URL) throw new Error("Missing MONGO_DB_URL");
if (!env.UPLOADTHING_SECRET) throw new Error("Missing UPLOADTHING_SECRET");
if (!env.UPLOADTHING_APP_ID) throw new Error("Missing UPLOADTHING_APP_ID");
