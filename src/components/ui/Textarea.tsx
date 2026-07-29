import type { ComponentPropsWithRef } from "react";

// 通常のtextareaが持っている属性をすべて利用できるようにする
type TextareaProps = ComponentPropsWithRef<"textarea">;

export default function Textarea({
  className = "",
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`min-h-40 border p-2 ${className}`}
    />
  );
}