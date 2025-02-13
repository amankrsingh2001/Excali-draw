"use client";

import { ReactNode } from "react";
import { cn } from "clsx-for-tailwind";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  variant?: "primary";
}

export const Button = ({ children, variant = "primary", className, appName }: ButtonProps) => {
  const buttonStyle = cn(
    "btn",
    variant === "primary" && "bg-red-200 text-white h-[20px] w-[20px]",
    className
  );

  return (
    <button className={buttonStyle} onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};
