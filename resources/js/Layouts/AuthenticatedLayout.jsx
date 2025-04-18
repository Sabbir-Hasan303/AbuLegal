import { useState, useEffect } from "react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import Sidebar from "@/Components/Backend/sidebar"
import { cn } from "@/lib/utils"

export default function AuthenticatedLayout({ children }) {
  const [mounted, setMounted] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // This prevents hydration errors with animations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onCollapsedChange={setSidebarCollapsed} />

      <div
        className={cn("transition-all duration-300 ease-in-out", sidebarCollapsed ? "lg:pl-[80px]" : "lg:pl-[250px]")}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 lg:px-10">
          {/* <div className="hidden lg:flex lg:flex-1">
            <form className="w-full max-w-[400px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background pl-8 focus-visible:ring-primary"
                />
              </div>
            </form>
          </div> */}

          <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className='relative opacity-50 cursor-not-allowed'
                  disabled>
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="opacity-50">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 lg:p-10 animate-fadeIn">{children}</main>
      </div>
    </div>
  )
}
