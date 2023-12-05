import { DefaultSession, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import { Awaitable, Session, Profile } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
    };
    username: string; // Here you are telling typescript that you session will have the username property, if you want your client to have access to this property
  }
  interface User extends DefaultUser {
    username: string; // the user will now have the property
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        if (!profile) {
          throw new Error('No profile found');
        }
        console.log(profile);

        await connectToDB();

        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(/\s/g, '').toLowerCase(),
            image: profile.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
