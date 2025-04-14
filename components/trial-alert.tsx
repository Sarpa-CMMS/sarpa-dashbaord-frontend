"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface TrialAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  daysLeft: number
  planName: string
  buttonText: string
  onUpgradeClick?: () => void
}



export function TrialAlert({
  daysLeft,
  planName,
  buttonText = "ارتقا",
  onUpgradeClick,
  className,
  ...props
}: TrialAlertProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex flex-col gap-3 rounded-md bg-primary p-4 text-primary-foreground dark:text-white",
                className
              )}
              {...props}
            >
              <div className="flex flex-col">
                <p className="font-medium">دوره آزمایشی شما {daysLeft} روز دیگر به پایان می‌رسد</p>
                <p className="text-sm opacity-90">شما در حال استفاده از نسخه آزمایشی  سرپا هستید.</p>
              </div>
              <Button
                onClick={onUpgradeClick}
                variant="outline"
                className="border-primary-foreground/20 dark:border-white/20 bg-transparent text-primary-foreground dark:text-white hover:bg-primary-foreground/10 dark:hover:bg-white/10"
              >
                ارتفا اشتراک
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
} 