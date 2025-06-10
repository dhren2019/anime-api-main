import { User } from "@clerk/nextjs/server";
import { createContext } from "react";

interface AuthContextType {
    user: User | null;
    isLoaded: boolean;
    error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);