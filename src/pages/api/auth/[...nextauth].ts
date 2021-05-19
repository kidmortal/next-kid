import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider, providers } from "next-auth/client";
import Providers from "next-auth/providers";

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: "light",
};

export default (req, res) => NextAuth(req, res, options);
