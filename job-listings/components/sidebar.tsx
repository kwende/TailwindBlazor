"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Mail,
  BarChart2,
  MessageSquare,
  Zap,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const isMobile = useMobile()

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true)
    }
  }, [isMobile])

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      title: "Jobs",
      href: "/jobs",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      title: "Candidates",
      href: "/candidates",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Hireaide",
      href: "/hireaide",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        {
          title: "Company Profile",
          href: "/settings/company-profile",
          icon: <Briefcase className="h-4 w-4" />,
        },
        {
          title: "Company Info",
          href: "/settings/company-info",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Offer Settings",
          href: "/settings/offer-settings",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Email Templates",
          href: "/settings/email-templates",
          icon: <Mail className="h-4 w-4" />,
        },
      ],
    },
  ]

  // Check if the current path matches a nav item or its subitems
  const isActiveLink = (href: string) => {
    if (pathname === href) return true
    if (pathname.startsWith(href) && href !== "/") return true
    return false
  }

  // Determine if a section should be expanded
  const isSectionExpanded = (item: any) => {
    if (!item.subItems) return false
    return item.subItems.some((subItem: any) => isActiveLink(subItem.href))
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-[#0b84740d] text-black transition-all duration-300 ease-in-out h-full",
        collapsed ? "w-[70px]" : "w-[250px]",
        className,
      )}
    >
      <div className="flex h-14 items-center px-3 border-b border-white/20 justify-between">
        {!collapsed ? (
          <Link href="/" className="flex items-center">
            <img src="/images/ph-letters.svg" alt="Perfect Hire" className="h-8" />
          </Link>
        ) : (
          <span className="w-8"></span> // Empty placeholder when collapsed
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto text-black hover:bg-[#0a7566] hover:text-white"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          {navItems.map((item, index) => {
            const isActive = isActiveLink(item.href)
            const isExpanded = isSectionExpanded(item)

            return (
              <div key={index} className="flex flex-col">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm text-black font-medium transition-colors",
                    isActive ? "bg-[#0a7566] text-white" : "text-black/80 hover:bg-[#0a7566] hover:text-white",
                  )}
                >
                  <div className={cn("flex-shrink-0", collapsed ? "mx-auto" : "")}>{item.icon}</div>
                  {!collapsed && <span>{item.title}</span>}
                </Link>

                {!collapsed && item.subItems && isExpanded && (
                  <div className="ml-6 mt-1 flex flex-col gap-1">
                    {item.subItems.map((subItem: any, subIndex: number) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                          isActiveLink(subItem.href)
                            ? "bg-[#0a7566] text-white"
                            : "text-black/80 hover:bg-[#0a7566] hover:text-white",
                        )}
                      >
                        {subItem.icon}
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

