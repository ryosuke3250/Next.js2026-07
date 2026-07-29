import type { ComponentPropsWithRef } from "react";

// 通常のbuttonが持つ属性をすべて使えるようにする
type ButtonProps = ComponentPropsWithRef<"button">;

export default function Button({
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`border px-4 py-2 ${className}`}
    />
  );
}