"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellIcon, Grid2X2 } from "lucide-react"
import { TeamPerformanceDashboard } from "@/components/dashboards/team-performance-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <SiteHeader 
        title="تجزیه و تحلیل"
      />
      <div className="px-6 py-4">
        <Tabs dir="rtl" defaultValue="team-performance" className="w-full">
          <TabsList>
            <TabsTrigger value="team-performance">عملکرد تیم</TabsTrigger>
            <TabsTrigger value="cost">هزینه نگهداری</TabsTrigger>
            <TabsTrigger value="asset">خرابی و بهره‌برداری از دارایی‌ها</TabsTrigger>
          </TabsList>
          <TabsContent value="team-performance">
            <TeamPerformanceDashboard />
          </TabsContent>
          <TabsContent value="cost">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">هزینه نگهداری</h2>
              <p className="text-muted-foreground">داشبورد تحلیل هزینه به زودی در دسترس خواهد بود.</p>
            </div>
          </TabsContent>
          <TabsContent value="asset">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">خرابی و بهره‌برداری از دارایی‌ها</h2>
              <p className="text-muted-foreground">داشبورد تحلیل دارایی‌ها به زودی در دسترس خواهد بود.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}