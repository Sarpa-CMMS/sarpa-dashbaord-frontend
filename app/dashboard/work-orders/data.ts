import { z } from "zod";

// Define the data schema for work orders
export const workOrderSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  dueDate: z.date(),
  startDate: z.date(),
  createdAt: z.date(),
  priority: z.string(),
  category: z.string(),
  status: z.string(),
});

// Create a type from the schema
export type WorkOrder = z.infer<typeof workOrderSchema>;

// Define priority types for better type safety
export type Priority = "بالا" | "متوسط" | "پایین";

// Define status types for better type safety
export type Status = "open" | "in progress" | "on hold" | "complete";

// Define category types
export type Category = "تاسیسات" | "امنیت" | "برق" | "تعمیرات" | "نظافت" | "تجهیزات";

// Actual data
export const workOrdersData: WorkOrder[] = [
  {
    id: 1,
    title: "تعمیر سیستم تهویه",
    description: "بررسی و تعمیر سیستم تهویه ساختمان اصلی",
    dueDate: new Date("2024/07/05"), // 1403/04/15
    startDate: new Date("2024/06/09"), // 1403/03/20
    createdAt: new Date("2024/06/04"), // 1403/03/15
    priority: "بالا",
    category: "تاسیسات",
    status: "in progress"
  },
  {
    id: 2,
    title: "نصب دوربین‌های امنیتی",
    description: "نصب دوربین‌های جدید در محوطه پارکینگ",
    dueDate: new Date("2024/07/31"), // 1403/05/10
    startDate: new Date("2024/07/15"), // 1403/04/25
    createdAt: new Date("2024/07/10"), // 1403/04/20
    priority: "متوسط",
    category: "امنیت",
    status: "open"
  },
  {
    id: 3,
    title: "تعویض لامپ‌های راهرو",
    description: "تعویض تمام لامپ‌های سوخته راهروی طبقه دوم",
    dueDate: new Date("2024/06/18"), // 1403/03/29
    startDate: new Date("2024/06/14"), // 1403/03/25
    createdAt: new Date("2024/06/09"), // 1403/03/20
    priority: "پایین",
    category: "برق",
    status: "complete"
  },
  {
    id: 4,
    title: "رنگ‌آمیزی دیوار لابی",
    description: "رنگ‌آمیزی مجدد دیوارهای لابی اصلی ساختمان",
    dueDate: new Date("2024/09/10"), // 1403/06/20
    startDate: new Date("2024/08/22"), // 1403/06/01
    createdAt: new Date("2024/08/15"), // 1403/05/25
    priority: "متوسط",
    category: "تعمیرات",
    status: "on hold"
  },
  {
    id: 5,
    title: "سرویس آسانسور",
    description: "سرویس دوره‌ای آسانسورهای ساختمان",
    dueDate: new Date("2024/06/25"), // 1403/04/05
    startDate: new Date("2024/06/21"), // 1403/04/01
    createdAt: new Date("2024/06/17"), // 1403/03/28
    priority: "بالا",
    category: "تاسیسات",
    status: "in progress"
  },
  {
    id: 6,
    title: "تعمیر سیستم آب‌رسانی",
    description: "رفع نشتی لوله‌های آب طبقه همکف",
    dueDate: new Date("2024/06/17"), // 1403/03/28
    startDate: new Date("2024/06/15"), // 1403/03/26
    createdAt: new Date("2024/06/13"), // 1403/03/24
    priority: "بالا",
    category: "تاسیسات",
    status: "complete"
  },
  {
    id: 7,
    title: "نظافت نمای ساختمان",
    description: "شستشوی شیشه‌ها و نمای خارجی ساختمان",
    dueDate: new Date("2024/08/05"), // 1403/05/15
    startDate: new Date("2024/07/31"), // 1403/05/10
    createdAt: new Date("2024/07/26"), // 1403/05/05
    priority: "پایین",
    category: "نظافت",
    status: "open"
  },
  {
    id: 8,
    title: "تعویض فرش‌های سالن کنفرانس",
    description: "تعویض فرش‌های فرسوده سالن کنفرانس اصلی",
    dueDate: new Date("2024/08/31"), // 1403/06/10
    startDate: new Date("2024/08/26"), // 1403/06/05
    createdAt: new Date("2024/08/20"), // 1403/05/30
    priority: "متوسط",
    category: "تجهیزات",
    status: "open"
  },
  {
    id: 9,
    title: "تعمیر سیستم اعلام حریق",
    description: "بررسی و تعمیر سنسورهای خراب سیستم اعلام حریق",
    dueDate: new Date("2024/06/30"), // 1403/04/10
    startDate: new Date("2024/06/25"), // 1403/04/05
    createdAt: new Date("2024/06/21"), // 1403/04/01
    priority: "بالا",
    category: "امنیت",
    status: "in progress"
  },
  {
    id: 10,
    title: "نصب کولر گازی",
    description: "نصب کولر گازی جدید در اتاق سرور",
    dueDate: new Date("2024/07/15"), // 1403/04/25
    startDate: new Date("2024/07/10"), // 1403/04/20
    createdAt: new Date("2024/07/05"), // 1403/04/15
    priority: "بالا",
    category: "تاسیسات",
    status: "on hold"
  }
]; 