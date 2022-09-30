import NextAuth from 'next-auth'
import TwitterProvider from 'next-auth/providers/twitter'
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOGGLE_CLIENT_SECRET
    // }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version: '2.0', // opt-in to twitter O-Auth 2.0
    })
  ],
}

export default NextAuth(authOptions)