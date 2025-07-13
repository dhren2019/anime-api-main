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
import { Key, Settings, Search, Code, Lock, LucideIcon, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import dragonballIcon from '@/public/dragonball.svg'

interface IconProps {
    className?: string;
}

type IconType = LucideIcon | React.FC<IconProps>;

interface SidebarItem {
    title: string;
    url: string;
    icon: IconType;
    requiresPro?: boolean;
}

const CustomDragonballIcon: React.FC<IconProps> = ({ className }) => (
    <Image src={dragonballIcon} alt="DragonBall" width={16} height={16} className={className} />
);

const items: SidebarItem[] = [
    {
        title: "Generar Clave API",
        url: "/dashboard",
        icon: Key,
    },
    {
        title: "DragonBall API",
        url: "/dragonball",
        icon: CustomDragonballIcon,
        requiresPro: true
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
        requiresPro: true
    },    {
        title: "Documentación",
        url: "/docs",
        icon: FileText,
    },
    {
        title: "Configuración",
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
    const isPro = plan === 'pro';

    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Image src={'/logo.svg'} alt='logo' width={100} height={100}
                        className='w-full h-full' />
                    <h2 className='text-sm text-gray-400 text-center'>Plataforma de API de Anime</h2>
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
                                        text-base font-semibold tracking-tight relative
                                        ${path === item.url
                                            ? 'bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700 shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-violet-700'}
                                        ${item.requiresPro && !isPro ? 'opacity-50' : ''}
                                    `}
                                    style={{ letterSpacing: '-0.01em' }}
                                >
                                    <item.icon className={`h-4 w-4 ${path === item.url ? 'text-violet-700' : 'text-gray-400'}`} />                                    <div className="flex items-center">
                                        <span>{item.title}</span>
                                        {item.url === '/dragonball' && (
                                            <Badge variant="new" className="ml-2 text-[10px] py-0 px-1.5">NEW</Badge>
                                        )}
                                    </div>
                                    {item.requiresPro && !isPro && (
                                        <Lock className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                                    )}
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
                                <span className="text-white font-bold text-lg mb-2">Actualizar a pro</span>
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
                                <span className="text-white font-bold text-lg mb-2">Uso de API</span>
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