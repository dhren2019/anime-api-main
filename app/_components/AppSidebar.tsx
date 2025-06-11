import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
} from "@/components/ui/sidebar"
import { Key, Settings, Search, Code } from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const items = [
    {
        title: "Generate API Key",
        url: "/dashboard",
        icon: Key,
    },
    {
        title: "Buscar Anime",
        url: "/search",
        icon: Search,
    },
    {
        title: "Snippets",
        url: "/snippets",
        icon: Code,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

// Añadir props para el uso de la API key principal
interface SidebarUpgradeProps {
  requestsCount?: number;
  requestsLimit?: number;
  plan?: string;
}

export function AppSidebar({ requestsCount = 0, requestsLimit = 10, plan = 'free' }: SidebarUpgradeProps) {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.svg'} alt='logo' width={100} height={100}
                        className='w-full h-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Anime API Platform</h2>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5 flex flex-col gap-2'>
                            {items.map((item, index) => (
                                <Link
                                    href={item.url}
                                    key={index}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-150
                                        text-base font-semibold tracking-tight
                                        ${path === item.url
                                            ? 'bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-violet-700'}
                                    `}
                                    style={{ letterSpacing: '-0.01em' }}
                                >
                                    <item.icon className={`h-4 w-4 ${path === item.url ? 'text-violet-700' : 'text-gray-400'}`} />
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="w-full px-3 pb-3">
                    <div className="bg-gradient-to-r from-violet-600 via-blue-500 to-indigo-400 rounded-xl p-4 flex flex-col items-center shadow-lg">
                        {plan === 'free' ? (
                            <>
                                <span className="text-white font-bold text-lg mb-2">Upgrade to pro</span>
                                <span className="text-white text-xs mb-3 text-center opacity-80">Desbloquea 150 peticiones al mes y soporte premium</span>
                                <div className="w-full mb-3">
                                    <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                                        <div className="h-2 bg-white rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((requestsCount / 10) * 100))}%` }}></div>
                                    </div>
                                    <div className="text-white text-xs mt-1 text-center opacity-80">{requestsCount} / 10</div>
                                </div>
                                <Link href="/upgrade" className="bg-white text-violet-700 font-semibold px-3 py-1 rounded-[25px] shadow hover:bg-violet-100 transition text-sm">Mejorar</Link>
                            </>
                        ) : (
                            <>
                                <span className="text-white font-bold text-lg mb-2">API usage</span>
                                <div className="w-full mb-3">
                                    <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
                                        <div className="h-2 bg-white rounded-full transition-all" style={{ width: `${Math.min(100, Math.round((requestsCount / 150) * 100))}%` }}></div>
                                    </div>
                                    <div className="text-white text-xs mt-1 text-center opacity-80">{requestsCount} / 150</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}