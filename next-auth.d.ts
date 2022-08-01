import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      username?: string;
      email?: string;
      role?: string;
    };
  }
  interface User {
    username?: string;
    email?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    email?: string;
    role?: string;
  }
}
