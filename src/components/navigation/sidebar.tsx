import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarSeparator,
    useSidebar,
} from "@/components/ui/sidebar"

import { FaBook, FaBookBookmark, FaChevronDown, FaChevronRight, FaCircleNodes, FaGear, FaHouse, FaPlantWilt, FaUserGear } from "react-icons/fa6"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const mainLinks = [
    {
        title: "Test",
        showTitle: false,
        items: [
            {
                title: "Home",
                url: "/app",
                icon: FaHouse,
            },
            {
                title: "Sample Pages",
                url: "/app/sample-pages",
                icon: FaBook,
                sublinks: [
                    {
                        title: "Page 1",
                        url: "/app/sample-pages/1",
                        icon: FaBookBookmark,
                    },
                    {
                        title: "Page 2",
                        url: "/app/sample-pages/2",
                        icon: FaBookBookmark,
                    }
                ]
            }
        ]
    },
    {
        title: "Settings",
        showTitle: true,
        items: [
            {
                title: "Account",
                url: "/app/settings",
                icon: FaUserGear,
            }
        ]
    }
]

export const AppSidebar = () => {

    const { state, open } = useSidebar();
    const path = usePathname();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/" legacyBehavior passHref className="cursor-pointer">
                    {/* image here */}
                    {open ?
                        <p className="font-bold">LOGO here</p>
                        :
                        <div className="h-8 w-8 p-1">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src="#" alt="@shadcn" />
                                <AvatarFallback>Logo</AvatarFallback>
                            </Avatar>
                        </div>
                    }
                </Link>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
                {mainLinks.map((group) => {
                    return (
                        <SidebarGroup>
                            {group.showTitle && <SidebarGroupLabel>{group.title}</SidebarGroupLabel>}
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((link) => {
                                        if (link.sublinks) {
                                            return (
                                                <Collapsible open={path.includes(link.url)} className="group/collapsible">
                                                    <SidebarMenuItem>
                                                        <CollapsibleTrigger asChild>
                                                            <SidebarMenuButton asChild className={cn([path === link.url && "bg-muted"])}>
                                                                <Link className="w-full" href={link.url}>
                                                                    <div className="flex flex-row items-center w-full">
                                                                        <div className="flex flex-row items-center gap-2 w-full">
                                                                            <link.icon />
                                                                            {open && <span>{link.title}</span>}
                                                                        </div>
                                                                        <FaChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                                    </div>
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent>
                                                            <SidebarMenuSub>
                                                                {link.sublinks.map((sublink) => {
                                                                    return (
                                                                        <SidebarMenuSubItem>
                                                                            <SidebarMenuButton asChild className={cn([path === sublink.url && "bg-muted"])}>
                                                                                <Link href={sublink.url}>
                                                                                    <sublink.icon />
                                                                                    <span>{sublink.title}</span>
                                                                                </Link>
                                                                            </SidebarMenuButton>
                                                                        </SidebarMenuSubItem>
                                                                    )
                                                                })}
                                                            </SidebarMenuSub>
                                                        </CollapsibleContent>
                                                    </SidebarMenuItem>
                                                </Collapsible>
                                            )
                                        } else {
                                            return (
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton asChild className={cn([path === link.url && "bg-muted"])}>
                                                        <Link href={link.url}>
                                                            <link.icon />
                                                            <span>{link.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        }
                                    })}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
            {/* <SidebarFooter>
                
            </SidebarFooter> */}
            <SidebarRail />
        </Sidebar>
    )
}
