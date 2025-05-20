"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart, FileText, Settings, Tag, LogOut, Menu, X, Home, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/components/ui/use-toast"

export default function DevSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Skip rendering sidebar on login page
  if (pathname === "/dev/login") {
    return null
  }

  const handleLogout = () => {
    try {
      // Clear the auth cookie
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

      // Show success message
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })

      // Redirect to login page
      router.push("/dev/login")
    } catch (error) {
      console.error("Error during logout:", error)
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dev/dashboard",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      name: "Posts",
      href: "/dev/posts",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Categories",
      href: "/dev/categories",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dev/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col h-full p-4 pt-16">
            <Link href="/" className="flex items-center mb-8 px-4">
              <span className="text-xl font-bold font-playfair">Minimalist CMS</span>
            </Link>

            <nav className="space-y-1 flex-1">
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <Home className="h-5 w-5 mr-3" />
                View Blog
              </Link>

              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm rounded-md ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-zinc-100 dark:bg-zinc-800 font-medium"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <Button variant="ghost" className="w-full justify-start px-4 py-3 text-sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>

              <div className="flex items-center justify-between px-4 mt-4">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        className={`hidden md:flex flex-col border-r border-zinc-200 dark:border-zinc-800 h-screen sticky top-0 ${
          isCollapsed ? "w-[70px]" : "w-[240px]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          {!isCollapsed && (
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold font-playfair">Minimalist</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={isCollapsed ? "mx-auto" : ""}
          >
            <ChevronRight className={`h-5 w-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="flex-1 py-6 flex flex-col justify-between">
          <nav className="space-y-1 px-2">
            <Link
              href="/"
              className={`flex items-center px-2 py-2 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <Home className="h-5 w-5 min-w-5" />
              {!isCollapsed && <span className="ml-3">View Blog</span>}
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-2 py-2 text-sm rounded-md ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-zinc-100 dark:bg-zinc-800 font-medium"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </nav>

          <div className="px-2 space-y-2">
            <Button
              variant="ghost"
              className={`text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isCollapsed ? "justify-center w-full px-2" : "justify-start w-full"
              }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 min-w-5" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </Button>

            {!isCollapsed ? (
              <div className="flex items-center justify-between px-2 py-2">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
                <ModeToggle />
              </div>
            ) : (
              <div className="flex justify-center py-2">
                <ModeToggle />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
