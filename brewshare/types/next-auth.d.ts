// types/next-auth.d.ts
import "next-auth"

declare module "next-auth" {
  /**
   * Extending the built-in session types to include the user id.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}