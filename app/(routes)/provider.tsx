"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import axios from "axios";
import AppHeader from '../_components/AppHeader';
import { AppSidebar } from '../_components/AppSidebar';

function DashboardProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mainKey, setMainKey] = useState({ requestsCount: 0, requestsLimit: 10, plan: 'free' });

    useEffect(() => {
        async function fetchApiKeys() {
            try {
                const res = await fetch('/api/keys');
                if (!res.ok) return;
                const data = await res.json();
                if (data.keys && data.keys.length > 0) {
                    const k = data.keys[0];
                    setMainKey({
                        requestsCount: k.requestsCount ?? 0,
                        requestsLimit: k.requestsLimit ?? (k.plan === 'pro' ? 150 : 10),
                        plan: k.plan ?? 'free',
                    });
                }
            } catch {}
        }
        fetchApiKeys();
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar requestsCount={mainKey.requestsCount} requestsLimit={mainKey.requestsLimit} plan={mainKey.plan} />
            <main className='w-full'>
                <AppHeader />
                {/* <SidebarTrigger /> */}
                <div className='p-10'>{children}</div>
            </main>
        </SidebarProvider>

    )
}

export default DashboardProvider