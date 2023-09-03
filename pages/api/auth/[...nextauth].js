import NextAuth from "next-auth"
import TwitchProvider from "next-auth/providers/twitch"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitchProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      //console.log("----------");
      //console.log(session, user);
      session.user.id = user.id; //this is the mongo DB session ID to find the user
      //session.vince = "THIS IS ONLY A TEST";
      return session
    }
  }
}
export default NextAuth(authOptions)

