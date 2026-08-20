"use client";
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { type LoginFormData, loginSchema } from "../schemas/loginSchema";
import { getUsers } from "../../register/api/users";

export default function LoginForm() {
  const router = useRouter();

  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:"",
    }
  });
  const onSubmit = async (data: LoginFormData) =>{
    try {
      const users = getUsers();

      const user = users.find(
        (user) => 
          user.email.toLowerCase() ===
            data.email.toLowerCase() &&
          user.password === data.password,
      )

      if(!user) {
        setError("root",{
          type: "manual",
          message: "メールアドレス、またはパスワードが違います。"
        });

        return;
      }

      const currentUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser),
      );

      router.push("/posts");
    } catch {
      setError("root",{
        type: "manual",
        message: "ログインに失敗しました。"
      });
    }
  };
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">ログイン</CardTitle>

        <CardDescription>
          メールアドレスとパスワードを入力してください
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />

            {errors.email && (
              <p
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              パスワード
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="パスワードを入力"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />

            {errors.password && (
              <p
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p role="alert" className="text-center text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "ログイン中..." : "ログイン"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          アカウントを持っていない方は

          <Link
            href="/register"
            className="ml-1 text-primary underline"
          >
            会員登録
          </Link>
        </p>
      </CardContent>
    </Card>
  );
  }