import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "../../../models/user.model";
import mongoose from "mongoose";

export default NextAuth({
    providers: [
      CredentialsProvider({
        name: "credentials",
        // fetch user from database
        async authorize(credentials) {
          await mongoose.connect(process.env.DB_URL);
          const user = await UserModel.findOne({ username: credentials.username , password: credentials.password});
        //   console.log('user: ', user);
          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async session({ session }) {
        // console.log('session: ', session);
        const user = await UserModel.findOne({ email: session.user.email }, { password: 0 });
        // console.log('user: ', user);
        if (session.user) {
            
          session.user.id = user._id;
          session.user.username = user.username;
          session.user.email = user.email;
        }
        return session;
      },
    },
  
    pages: {
      pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      }
    },
  });