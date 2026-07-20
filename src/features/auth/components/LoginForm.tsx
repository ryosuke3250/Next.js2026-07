"use client";
import Link from "next/link"
import Button from "@/src/common/components/ui/Button";
import Input from "@/src/common/components/ui/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const {register, handleSubmit} = useForm<LoginFormData>();
  const onSubmit = () =>{
    router.push("/posts")
  }
  return (
    <div className="w-full max-w-md rounded-lg border p-5 ">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">ログイン</h1>
        <p className="mt-2 text-sm text-gray-500">
          メールアドレスとパスワードを入力してください
        </p>
      </div>

      <form className="space-y-4 text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <label htmlFor="email" className="w-32 text-left">
            メールアドレス
          </label>

          <Input
            id="email"
            type="email"
            placeholder="example@example.com"
            {...register("email")}
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="password" className="w-32 text-left">
            パスワード
          </label>

          <Input
            id="password"
            type="password"
            placeholder="パスワードを入力"
            {...register("password")}
          />
        </div>
        <div className="text-center">
        <Button type="submit" >ログイン</Button>
        </div>
      </form>

      <p className="mt-3 text-center">
        アカウントを持っていない方は
        <Link href="/register" className="text-blue-600">
          会員登録
        </Link>
      </p>
    </div>
  );
}