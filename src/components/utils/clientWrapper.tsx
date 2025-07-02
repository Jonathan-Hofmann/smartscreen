"use client"

import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import { AppSidebar } from "../navigation/sidebar"

export const ClientProviders = ({ children }: { children: any }) => {
    const path = usePathname();
    return (
        <SidebarProvider>
            <>
                {/* <AppSidebar /> */}
                {/* <div className="w-full bg-zinc-100 dark:bg-zinc-900">
                    <SidebarTrigger />
                    <div className="container mx-auto"> */}
                        {children}
                    {/* </div>
                </div> */}
            </>
        </SidebarProvider>
    )
}