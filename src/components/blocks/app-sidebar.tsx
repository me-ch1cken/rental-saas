"use client"

import * as React from "react"
import { Calendar, History, Package, PieChart, Settings, LogOut, User, Gift, X } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Navigation items
const links = [
    {
        title: "Overview",
        url: "#",
        icon: PieChart,
        currentlyActive: true,
    },
    {
        title: "Reservations",
        url: "#",
        icon: Calendar,
        currentlyActive: false,
    },
    {
        title: "Stock",
        url: "#",
        icon: Package,
        currentlyActive: false,
    },
    {
        title: "History",
        url: "#",
        icon: History,
        currentlyActive: false,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [navItems, setNavitems] = React.useState(links)
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const [isPromotionVisible, setIsPromotionVisible] = React.useState(true)

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <PieChart className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Restaurant Manager</span>
                                    <span className="text-xs">Dashboard</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className={"px-3 py-2" + (item.currentlyActive ? " bg-sidebar-accent text-sidebar-accent-foreground" : "")}>
                                        <a href={item.url} onClick={(e) => {
                                            for (const navItem of navItems) {
                                                navItem.currentlyActive = false
                                            }
                                            item.currentlyActive = true
                                            setNavitems([...navItems]) 
                                        }}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                {/* Promotions Section */}
                {isPromotionVisible && (
                    <div className="p-2">
                        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                            <CardHeader className="pb-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Gift className="size-4" />
                                        <CardTitle className="text-sm">Special Offer!</CardTitle>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0 hover:bg-white/20 hover:text-white text-white"
                                        onClick={() => setIsPromotionVisible(false)}
                                    >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Close promotion</span>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <CardDescription className="text-orange-100 text-xs">
                                    Get 20% off premium features this month
                                </CardDescription>
                                <Button size="sm" variant="secondary" className="mt-2 h-7 text-xs">
                                    Learn More
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* User Section */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                            <PopoverTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer py-8"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                                        <User className="size-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">John Doe</span>
                                        <span className="text-xs text-sidebar-foreground/70">Manager</span>
                                    </div>
                                </SidebarMenuButton>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2" side="top" align="start" sideOffset={4}>
                                <div className="flex flex-col">
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-10 px-4 py-2"
                                        onClick={() => {
                                            setIsPopoverOpen(false)
                                            // Handle settings navigation
                                        }}
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="justify-start h-10 px-4 py-2 text-red-600 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => {
                                            setIsPopoverOpen(false)
                                            // Handle logout
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
