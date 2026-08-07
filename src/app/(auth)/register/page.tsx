import Link from "next/link";

import RegisterForm from "./comopnents/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";



export default function RegisterPage() {
  return(
     <main className="flex justify-center items-center min-h-screen p-6 ">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>アカウント作成</CardTitle>
        </CardHeader>

        <CardContent>
          <RegisterForm />

          <p className="mt-6 text-center text-sm">
            すでにアカウントをお持ちですか？
            <Link
              href="/login"
              className="ml-1 underline"
            >
              ログイン
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}