"use client"
import { AuthContext } from '@/context/AuthContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, isLoaded } = useUser();
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user && !isCreatingUser) {
            createNewUser();
        }
    }, [user]);

    const createNewUser = async () => {
        try {
            setIsCreatingUser(true);
            setError(null);
            const result = await axios.post('/api/user');
            console.log('User created/updated:', result.data);
        } catch (err) {
            console.error('Error creating user:', err);
            setError(err instanceof Error ? err.message : 'Error creating user');
        } finally {
            setIsCreatingUser(false);
        }
    }

    // Si Clerk aún no ha cargado, mostramos un estado de carga
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, isLoaded, error }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default Provider

