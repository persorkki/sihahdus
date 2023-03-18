import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const secret = process.env.NEXTAUTH_SECRET

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/auth/signin',
    //signOut: 'auth/signout'
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        password: { label: "Keyword", type: "text", placeholder: "password here" }
      },
      async authorize(credentials) {
        if (credentials.password === secret)
          return {
            id: 1,
            username: "sihahtaja"
          }
        else return null;
      }
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)