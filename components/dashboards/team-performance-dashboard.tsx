"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// Define the WorkOrder type
type WorkOrder = {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  startDate: Date;
  createdAt: Date;
  priority: string;
  category: string;
  status: string;
};

export function TeamPerformanceDashboard() {
  const [dateRange, setDateRange] = useState("Last 90 Days")
  const [mockWorkOrdersData, setMockWorkOrdersData] = useState<WorkOrder[]>([])
  const [isClient, setIsClient] = useState(false)
  
  const dateRangeOptions = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 14 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Year To Date"
  ]
  
  // Generate mock work orders data only on the client side
  useEffect(() => {
    setIsClient(true)
    
    const workOrders: WorkOrder[] = [];
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    
    const categories = ["تاسیسات", "امنیت", "برق", "تعمیرات", "نظافت", "تجهیزات"];
    const statuses = ["open", "in progress", "on hold", "complete"];
    const priorities = ["بالا", "متوسط", "پایین"];
    const titles = [
      "تعمیر سیستم تهویه",
      "نصب دوربین‌های امنیتی",
      "تعویض لامپ‌های راهرو",
      "رنگ‌آمیزی دیوار",
      "سرویس آسانسور",
      "تعمیر سیستم آب‌رسانی",
      "نظافت نمای ساختمان",
      "تعویض فرش‌ها",
      "تعمیر سیستم اعلام حریق",
      "نصب کولر گازی"
    ];
    
    // Generate 500 work orders over the last year
    for (let i = 0; i < 500; i++) {
      // Random creation date within the past year
      const createdAt = new Date(
        oneYearAgo.getTime() + 
        Math.random() * (now.getTime() - oneYearAgo.getTime())
      );
      
      // More recent dates have higher chance of being incomplete
      const daysSinceCreation = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      let statusChance;
      
      if (daysSinceCreation < 7) {
        // Very recent work orders are less likely to be complete
        statusChance = [0.4, 0.3, 0.2, 0.1]; // 10% complete
      } else if (daysSinceCreation < 30) {
        // Work orders from last month have medium chance to be complete
        statusChance = [0.2, 0.3, 0.1, 0.4]; // 40% complete
      } else {
        // Older work orders are more likely to be complete
        statusChance = [0.1, 0.1, 0.1, 0.7]; // 70% complete
      }
      
      const rand = Math.random();
      let statusIndex = 0;
      let sum = 0;
      
      for (let j = 0; j < statusChance.length; j++) {
        sum += statusChance[j];
        if (rand <= sum) {
          statusIndex = j;
          break;
        }
      }
      
      // Random start date after creation date
      const startDate = new Date(
        createdAt.getTime() + 
        Math.random() * Math.min(
          7 * 24 * 60 * 60 * 1000, // Max 7 days after creation
          now.getTime() - createdAt.getTime() // But not in the future
        )
      );
      
      // Random due date after start date
      const dueDate = new Date(
        startDate.getTime() + 
        (3 + Math.random() * 30) * 24 * 60 * 60 * 1000 // 3-30 days after start
      );
      
      workOrders.push({
        id: i + 1,
        title: titles[Math.floor(Math.random() * titles.length)],
        description: "توضیحات دستور کار",
        dueDate,
        startDate,
        createdAt,
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        status: statuses[statusIndex]
      });
    }
    
    setMockWorkOrdersData(workOrders);
  }, []);
  
  // Filter work orders based on the selected date range
  const filteredWorkOrders = useMemo(() => {
    if (!isClient) return [];
    
    const now = new Date();
    const startDate = new Date();
    
    // Set the start date based on the selected date range
    switch(dateRange) {
      case "Today":
        startDate.setHours(0, 0, 0, 0);
        break;
      case "Yesterday":
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        const endYesterday = new Date(startDate);
        endYesterday.setHours(23, 59, 59, 999);
        return mockWorkOrdersData.filter(order => {
          return order.createdAt >= startDate && order.createdAt <= endYesterday;
        });
      case "Last 7 Days":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "Last 14 Days":
        startDate.setDate(startDate.getDate() - 14);
        break;
      case "Last 30 Days":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "Last 90 Days":
        startDate.setDate(startDate.getDate() - 90);
        break;
      case "Year To Date":
        startDate.setMonth(0, 1);
        startDate.setHours(0, 0, 0, 0);
        break;
      default:
        startDate.setDate(startDate.getDate() - 90); // Default to 90 days
    }
    
    return mockWorkOrdersData.filter(order => {
      return order.createdAt >= startDate && order.createdAt <= now;
    });
  }, [dateRange, mockWorkOrdersData, isClient]);
  
  // Count total work orders
  const totalWorkOrders = filteredWorkOrders.length;
  
  // Count completed work orders
  const completedWorkOrders = filteredWorkOrders.filter(
    (order) => order.status === "complete"
  ).length;
  
  // Count preventive and reactive work orders (assuming category "تاسیسات" is preventive)
  const preventiveWorkOrders = filteredWorkOrders.filter(
    (order) => order.category === "تاسیسات"
  ).length;
  
  // All other categories are considered reactive
  const reactiveWorkOrders = totalWorkOrders - preventiveWorkOrders;

  // Generate chart labels based on date range
  const generateChartLabels = useMemo(() => {
    if (!isClient) return { labels: [], startDate: new Date() };
    
    const labels = [];
    const now = new Date();
    const startDate = new Date();
    
    // Set the start date based on the selected date range
    switch(dateRange) {
      case "Today":
        startDate.setHours(0, 0, 0, 0);
        // Generate hourly labels for today
        for (let i = 0; i < 24; i++) {
          labels.push(`${i.toString().padStart(2, '0')}:00`);
        }
        break;
      case "Yesterday":
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        // Generate hourly labels for yesterday
        for (let i = 0; i < 24; i++) {
          labels.push(`${i.toString().padStart(2, '0')}:00`);
        }
        break;
      case "Last 7 Days":
        startDate.setDate(startDate.getDate() - 7);
        // Generate labels for each day
        for (let i = 0; i <= 7; i++) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }));
        }
        break;
      case "Last 14 Days":
        startDate.setDate(startDate.getDate() - 14);
        // Generate labels for each day
        for (let i = 0; i <= 14; i += 2) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }));
        }
        break;
      case "Last 30 Days":
        startDate.setDate(startDate.getDate() - 30);
        // Generate labels for each day
        for (let i = 0; i <= 30; i += 3) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }));
        }
        break;
      case "Last 90 Days":
        startDate.setDate(startDate.getDate() - 90);
        // Generate labels for each week
        for (let i = 0; i <= 90; i += 7) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }));
        }
        break;
      case "Year To Date":
        startDate.setMonth(0, 1);
        startDate.setHours(0, 0, 0, 0);
        // Generate labels for each month
        for (let i = 0; i < 12; i++) {
          const date = new Date(now.getFullYear(), i, 1);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'long' }));
        }
        break;
      default:
        // Default to Last 90 Days
        startDate.setDate(startDate.getDate() - 90);
        for (let i = 0; i <= 90; i += 7) {
          const date = new Date(startDate);
          date.setDate(date.getDate() + i);
          labels.push(date.toLocaleDateString('fa-IR', { month: 'numeric', day: 'numeric' }));
        }
    }
    
    return { labels, startDate };
  }, [dateRange, isClient]);
  
  // Generate work order data for chart
  const workOrderChartData = useMemo(() => {
    if (!isClient) return [];
    
    const { labels, startDate } = generateChartLabels;
    const chartData = labels.map(name => ({ name, created: 0, completed: 0 }));
    
    // Helper to determine which data point a date falls into
    const getDataPointIndex = (date: Date, timespan: string): number => {
      const now = new Date();
      
      switch(timespan) {
        case "Today":
        case "Yesterday":
          // For today/yesterday, group by hour
          return date.getHours();
        case "Last 7 Days":
          // For last 7 days, calculate days since start
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        case "Last 14 Days":
          // For last 14 days, calculate days since start (grouped by 2)
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 2) * 2;
        case "Last 30 Days":
          // For last 30 days, calculate days since start (grouped by 3)
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 3) * 3;
        case "Last 90 Days":
          // For last 90 days, calculate days since start (grouped by week)
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 7) * 7;
        case "Year To Date":
          // For year to date, group by month
          return date.getMonth();
        default:
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 7) * 7;
      }
    };
    
    // Distribute real data based on actual dates
    filteredWorkOrders.forEach(order => {
      const index = getDataPointIndex(order.createdAt, dateRange);
      
      // Only count if within bounds
      if (index >= 0 && index < chartData.length) {
        chartData[index].created++;
      }
      
      // Count completed work orders
      if (order.status === "complete") {
        const index = getDataPointIndex(order.createdAt, dateRange);
        if (index >= 0 && index < chartData.length) {
          chartData[index].completed++;
        }
      }
    });
    
    return chartData;
  }, [filteredWorkOrders, dateRange, generateChartLabels, isClient]);

  // Generate preventive vs reactive data for chart
  const preventiveReactiveChartData = useMemo(() => {
    if (!isClient) return [];
    
    const { labels, startDate } = generateChartLabels;
    const chartData = labels.map(name => ({ name, preventive: 0, reactive: 0 }));
    
    // Helper function to get data point index - reusing logic from above
    const getDataPointIndex = (date: Date, timespan: string): number => {
      switch(timespan) {
        case "Today":
        case "Yesterday":
          return date.getHours();
        case "Last 7 Days":
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        case "Last 14 Days":
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 2) * 2;
        case "Last 30 Days":
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 3) * 3;
        case "Last 90 Days":
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 7) * 7;
        case "Year To Date":
          return date.getMonth();
        default:
          return Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) / 7) * 7;
      }
    };
    
    // Distribute real data based on actual dates
    filteredWorkOrders.forEach(order => {
      const index = getDataPointIndex(order.createdAt, dateRange);
      
      // Only count if within bounds
      if (index >= 0 && index < chartData.length) {
        if (order.category === "تاسیسات") {
          chartData[index].preventive++;
        } else {
          chartData[index].reactive++;
        }
      }
    });
    
    return chartData;
  }, [filteredWorkOrders, dateRange, generateChartLabels, isClient]);
  
  return (
    <div className="space-y-6 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">عملکرد تیم</h1>
        <div className="flex items-center gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium">بازه زمانی</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[160px] justify-between">
                  {dateRange}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[160px]">
                {dateRangeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setDateRange(option)}
                    className="flex items-center justify-between"
                  >
                    {option}
                    {dateRange === option && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Work Order Completion Rate Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium">نرخ تکمیل دستور کار</h2>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-center flex-col">
              <div className="text-5xl font-bold text-blue-500">
                {isClient ? totalWorkOrders : "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">ایجاد شده</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-center flex-col">
              <div className="text-5xl font-bold text-green-500">
                {isClient ? completedWorkOrders : "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">تکمیل شده</div>
            </CardContent>
          </Card>
        </div>
        <Card className="h-80">
          <CardContent className="pt-0 pb-0 px-6 h-full">
            {isClient ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workOrderChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="created" 
                    name="ایجاد شده"
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    name="تکمیل شده"
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">در حال بارگذاری...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preventive vs. Reactive Mix */}
      <div className="space-y-6">
        <h2 className="text-xl font-medium">نسبت پیشگیرانه و واکنشی</h2>
        <Card className="h-80">
          <CardContent className="pt-0 pb-0 px-6 h-full">
            {isClient ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={preventiveReactiveChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="preventive"
                    name="پیشگیرانه" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reactive"
                    name="واکنشی" 
                    stackId="1" 
                    stroke="#93c5fd" 
                    fill="#93c5fd" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">در حال بارگذاری...</p>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-center flex-col">
              <div className="text-5xl font-bold text-blue-500">
                {isClient ? preventiveWorkOrders : "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">پیشگیرانه</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center justify-center flex-col">
              <div className="text-5xl font-bold text-blue-300">
                {isClient ? reactiveWorkOrders : "-"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">واکنشی</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}