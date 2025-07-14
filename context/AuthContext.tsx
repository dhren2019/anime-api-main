import { UserResource } from "@clerk/types";
import { createContext } from "react";

interface AuthContextType {
    user: UserResource | null;
    isLoaded: boolean;
    error: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);