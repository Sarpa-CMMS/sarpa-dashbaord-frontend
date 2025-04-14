import Image from "next/image"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Image src="/images/logo.svg" alt="logo" width={32} height={32} />
          <span className="text-sm font-semibold">نرم افزار نگهداری تعمیرات سرپا</span>
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
