import { SiteHeader } from "@/components/site-header"
import { WorkOrdersTable } from "./components/work-orders-table"

import { workOrdersData } from "./data"

export default function Page() {
  return (
    <>
    <SiteHeader title="سفارشات کاری" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              <WorkOrdersTable data={workOrdersData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
