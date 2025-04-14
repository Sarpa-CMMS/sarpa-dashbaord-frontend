import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./ui/mode-toggle"
import { ReactNode } from "react"

interface SiteHeaderProps {
  title?: string
  startChildren?: ReactNode
  endChildren?: ReactNode
}

export function SiteHeader({ 
  title = "Documents", 
  startChildren, 
  endChildren 
}: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-xl font-bold">{title}</h1>
        {startChildren && (
          <div className="ml-4">{startChildren}</div>
        )}
        <div className="ml-auto flex items-center gap-2">
          {endChildren}
        </div>
      </div>
    </header>
  )
}
