"use client"

import { useState, useEffect } from "react"
import { Link, usePage } from "@inertiajs/react"
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  ChevronDown,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    exact: true,
  },
  {
    title: "Services",
    icon: Briefcase,
    href: "/dashboard/services",
    subItems: [
      {
        title: "All Services",
        href: "/dashboard/services",
        exact: true,
      },
      {
        title: "Add Service",
        href: "/dashboard/services/add",
      },
    ],
  },
  {
    title: "Contact",
    icon: MessageSquare,
    href: "/dashboard/contact",
  },
  {
    title: "FAQ",
    icon: HelpCircle,
    href: "/dashboard/faq",
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState({})
  const { url } = usePage()

  // Check if the current path matches the menu item
  const isActive = (href, exact = false) => {
    if (exact) {
      return url === href
    }
    return url.startsWith(href)
  }

  // Initialize expanded items based on active path
  useEffect(() => {
    const newExpandedItems = {}

    menuItems.forEach((item) => {
      if (item.subItems && isActive(item.href)) {
        newExpandedItems[item.title] = true
      }
    })

    setExpandedItems(newExpandedItems)
  }, [url])

  // Toggle submenu expansion
  const toggleSubmenu = (title) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-primary text-primary-foreground p-2 rounded-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-card border-r shadow-lg transition-all duration-300 ease-in-out",
          collapsed ? "w-[80px]" : "w-[250px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={cn(
              "flex items-center h-16 px-4 border-b transition-all duration-300",
              collapsed ? "justify-center" : "justify-between",
            )}
          >
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center font-bold">
                  AL
                </div>
                <span className="font-bold text-lg">Abu Legal</span>
              </div>
            )}
            {collapsed && (
              <div className="bg-primary text-primary-foreground w-10 h-10 rounded-md flex items-center justify-center font-bold">
                AL
              </div>
            )}
            <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setCollapsed(!collapsed)}>
              <ChevronRight
                className={cn("h-4 w-4 transition-transform duration-300", collapsed ? "rotate-180" : "")}
              />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4 overflow-y-auto">
            <TooltipProvider delayDuration={0}>
              <nav className="px-2 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.title}>
                    {/* Menu Item */}
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        {item.subItems ? (
                          <button
                            onClick={() => !collapsed && toggleSubmenu(item.title)}
                            className={cn(
                              "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                              "hover:bg-accent hover:text-accent-foreground",
                              "group relative overflow-hidden",
                              isActive(item.href) ? "bg-accent text-accent-foreground" : "",
                              collapsed ? "justify-center" : "justify-between",
                            )}
                          >
                            <div className="relative z-10 flex items-center gap-3">
                              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                              {!collapsed && <span>{item.title}</span>}
                            </div>
                            {!collapsed && item.subItems && (
                              <ChevronDown
                                className={cn(
                                  "h-4 w-4 transition-transform duration-200",
                                  expandedItems[item.title] ? "rotate-180" : "",
                                )}
                              />
                            )}
                            <div
                              className={cn(
                                "absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0",
                                isActive(item.href) ? "translate-x-0" : "",
                              )}
                            />
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                              "hover:bg-accent hover:text-accent-foreground",
                              "group relative overflow-hidden",
                              isActive(item.href, item.exact) ? "bg-accent text-accent-foreground" : "",
                              collapsed ? "justify-center" : "",
                            )}
                          >
                            <div className="relative z-10 flex items-center gap-3">
                              <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "")} />
                              {!collapsed && <span>{item.title}</span>}
                            </div>
                            <div
                              className={cn(
                                "absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0",
                                isActive(item.href, item.exact) ? "translate-x-0" : "",
                              )}
                            />
                          </Link>
                        )}
                      </TooltipTrigger>
                      {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                    </Tooltip>

                    {/* Sub Items */}
                    {!collapsed && item.subItems && expandedItems[item.title] && (
                      <div className="pl-10 pr-2 py-1 space-y-1 mt-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                              "hover:bg-accent hover:text-accent-foreground",
                              "group relative overflow-hidden",
                              isActive(subItem.href, subItem.exact) ? "bg-accent text-accent-foreground" : "",
                            )}
                          >
                            <div className="relative z-10 flex items-center gap-3">
                              <span>{subItem.title}</span>
                            </div>
                            <div
                              className={cn(
                                "absolute inset-0 bg-primary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 z-0",
                                isActive(subItem.href, subItem.exact) ? "translate-x-0" : "",
                              )}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </TooltipProvider>
          </div>

          {/* User Profile */}
          <div className={cn("border-t p-4", collapsed ? "flex justify-center" : "")}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 cursor-pointer",
                    collapsed ? "justify-center" : "justify-start",
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">Admin User</span>
                      <span className="text-xs text-muted-foreground">admin@abulegal.com</span>
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  )
}