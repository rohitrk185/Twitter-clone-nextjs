import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: '2.0', // opt-in to twitter O-Auth 2.0
    })
  ],
}

export default NextAuth(authOptions)