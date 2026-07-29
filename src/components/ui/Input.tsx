import type { ComponentPropsWithRef } from "react";

// 通常のinputが持っている属性をすべて利用できるようにする
type InputProps = ComponentPropsWithRef<"input">;

export default function Input({
  className = "",
  type = "text",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      type={type}
      className={`border p-2 ${className}`}
    />
  );
}