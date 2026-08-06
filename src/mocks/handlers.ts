import {delay, http, HttpResponse } from "msw";

type LoginRequestBody = {
  email: string;
  password: string;
}

//仮ユーザー
const testUsers = [
  {
    id:"1",
    name:"テストユーザー１",
    email:"test@exsample.com",
    password:"password123",
  },
  {
    id:"2",
    name:"テストユーザー２",
    email:"test2@exsample.com",
    password:"password1234"
  },
];

export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const data = (await request.json()) as LoginRequestBody;

    const user = testUsers.find(
      (user) =>
        user.email === data.email &&
        user.password === data.password,
    );

      if (!user) {
      return HttpResponse.json(
        {
          message:
            "メールアドレスまたはパスワードが間違っています",
        },
        {
          status: 401,
        },
      );
    }
    //パスワード以外の情報を返す
    return HttpResponse.json({
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }),
]

//仮APIの内容を定義する役割
