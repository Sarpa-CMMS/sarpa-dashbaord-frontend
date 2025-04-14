"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "./icons"
import { useIsMobile } from "@/hooks/use-mobile"
import { WorkOrder } from "../data"

export function getPriorityBadgeVariant(priority: string) {
  switch (priority) {
    case "بالا":
      return "destructive" as const
    case "متوسط":
      return "secondary" as const
    case "پایین":
      return "default" as const
    default:
      return "outline" as const
  }
}

export function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "open":
      return "default" as const
    case "in progress":
      return "secondary" as const
    case "on hold":
      return "destructive" as const
    case "complete":
      return "outline" as const
    default:
      return "outline" as const
  }
}

// Mobile Card Component
function WorkOrderCard({ workOrder, isSelected, onToggleSelect }: { 
  workOrder: WorkOrder; 
  isSelected: boolean;
  onToggleSelect: (selected: boolean) => void;
}) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{workOrder.title}</CardTitle>
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => onToggleSelect(!!value)}
            aria-label="انتخاب کارت"
          />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid gap-3">
          <div>
            <div className="text-xs text-muted-foreground">توضیحات</div>
            <div className="text-sm truncate">{workOrder.description}</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-muted-foreground">تاریخ شروع</div>
              <div className="text-sm">{workOrder.startDate.toLocaleDateString('fa-IR')}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">تاریخ پایان</div>
              <div className="text-sm">{workOrder.dueDate.toLocaleDateString('fa-IR')}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div>
              <div className="text-xs text-muted-foreground">اولویت</div>
              <Badge variant={getPriorityBadgeVariant(workOrder.priority)}>
                {workOrder.priority}
              </Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">دسته‌بندی</div>
              <Badge variant="outline" className="px-1.5">
                {workOrder.category}
              </Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">وضعیت</div>
              <Badge variant={getStatusBadgeVariant(workOrder.status)}>
                {workOrder.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function WorkOrdersTable({ data }: { data: WorkOrder[] }) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  
  const isMobile = useIsMobile()

  const columns: ColumnDef<WorkOrder>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="انتخاب همه"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="انتخاب ردیف"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "عنوان",
      cell: ({ row }) => (
        <div>
          {row.getValue("title")}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "توضیحات",
      cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "dueDate",
      header: "تاریخ پایان",
      cell: ({ row }) => <div>{(row.getValue("dueDate") as Date).toLocaleDateString('fa-IR')}</div>,
    },
    {
      accessorKey: "startDate",
      header: "تاریخ شروع",
      cell: ({ row }) => <div>{(row.getValue("startDate") as Date).toLocaleDateString('fa-IR')}</div>,
    },
    {
      accessorKey: "priority",
      header: "اولویت",
      cell: ({ row }) => (
        <Badge variant={getPriorityBadgeVariant(row.getValue("priority"))}>
          {row.getValue("priority")}
        </Badge>
      ),
    },
    {
      accessorKey: "category",
      header: "دسته‌بندی",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5">
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => (
        <Badge variant={getStatusBadgeVariant(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const currentPageData = table.getRowModel().rows.map(row => row.original)
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                ستون‌ها
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id === "title" && "عنوان"}
                      {column.id === "description" && "توضیحات"}
                      {column.id === "dueDate" && "تاریخ پایان"}
                      {column.id === "startDate" && "تاریخ شروع"}
                      {column.id === "priority" && "اولویت"}
                      {column.id === "category" && "دسته‌بندی"}
                      {column.id === "status" && "وضعیت"}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            افزودن سفارش کاری جدید
          </Button>
        </div>
      </div>
      {isMobile ? (
        // Mobile view with cards
        <div className="space-y-2">
          {currentPageData.map((workOrder) => (
            <WorkOrderCard 
              key={workOrder.id} 
              workOrder={workOrder}
              isSelected={table.getRowModel().rows.find(row => row.original.id === workOrder.id)?.getIsSelected() || false}
              onToggleSelect={(selected) => {
                const row = table.getRowModel().rows.find(row => row.original.id === workOrder.id)
                if (row) {
                  row.toggleSelected(selected)
                }
              }}
            />
          ))}
          {currentPageData.length === 0 && (
            <div className="text-center p-4 border rounded-lg">
              هیچ موردی یافت نشد.
            </div>
          )}
        </div>
      ) : (
        // Desktop view with table
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="text-right" key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    هیچ موردی یافت نشد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 space-y-4 sm:space-y-0">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} از{" "}
          {table.getFilteredRowModel().rows.length} مورد انتخاب شده.
        </div>
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-4 sm:gap-8 lg:w-fit">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              تعداد در هر صفحه
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            صفحه {table.getState().pagination.pageIndex + 1} از{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">صفحه اول</span>
              <IconChevronsRight />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">صفحه قبل</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">صفحه بعد</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">صفحه آخر</span>
              <IconChevronsLeft />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 