"use client";

import { useState } from "react";

import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import Textarea from "@/src/components/ui/Textarea";

import type { PostFormData } from "../types/post";

type PostFormProps = {
  //編集画面時の初期値を表示
  initialValues?: PostFormData;
  submitLabel: string;
  onSubmit: (data: PostFormData) => void;
};

export default function PostForm({
  initialValues = {
    title: "",
    content: "",
  },
  submitLabel,
  onSubmit,
}: PostFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const [error, setError] = useState("");

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("タイトルと投稿内容を入力してください");
      return;
    }

    setError("");

    onSubmit({
      title: title.trim(),
      content: content.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-2 block">
          タイトル
        </label>

        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          placeholder="タイトルを入力"
          className="w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-2 block">
          投稿内容
        </label>

        <Textarea
          id="content"
          name="content"
          value={content}
          placeholder="投稿内容を入力"
          className="w-full"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="text-center">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}