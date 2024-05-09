import NextAuth, {
  User,
  Account,
  Profile,
  Session,
  AuthOptions,
} from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/db/connectToDatabase";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { AdapterUser } from "next-auth/adapters";

interface SignInCallbackParams {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, unknown>;
}

interface MyUser extends User {
  id: string;
}

const options: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user }: SignInCallbackParams) {
      if (!user) {
        return false;
      }

      const { db } = await connectToDatabase();
      const collection = db.collection("users");

      const existingUser = await collection.findOne({ email: user.email });

      if (!existingUser) {
        await collection.insertOne({
          email: user.email,
          name: user.name,
          verified: true,
          createdAt: new Date()
        });
      }

      return true;
    },

    session: async ({ session }: { session: Session }) => {
      if (session?.user) {
        const { db } = await connectToDatabase();

        const collection = db.collection("users");
        const existingUser = await collection.findOne({
          email: session.user.email,
        });

        if (existingUser) {
          (session.user as MyUser).id = existingUser._id.toString();
        }
      }
      return session;
    },

    jwt: async ({ user, token }: { user: User; token: any }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
