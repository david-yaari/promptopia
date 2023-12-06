import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { DefaultUser, Session } from '@node_modules/next-auth/core/types';

import User from '@models/user';
import { connectToDB } from '@utils/database';

interface IUser extends DefaultUser {
  image?: string;
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session {
    user: User;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // To be added
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      session.user.id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        const a = profile;

        if (!profile) {
          throw new Error('No profile found');
        }
        // console.log(profile);
        // console.log(user);
        // console.log(account);

        profile.image = user.image!;

        await connectToDB();

        // Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        const picture = (profile as unknown as { picture: string }).picture;

        // If not, create user
        if (!userExists) {
          User.create({
            email: profile.email,
            username: profile.name?.replace(/\s/g, '').toLowerCase(),
            image: profile.image,
          })
            .then(() => {
              console.log('User created');
            })
            .catch((err: Error) => {
              console.log(err);
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
