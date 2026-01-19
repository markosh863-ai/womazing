import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200": variant === "primary",
          "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700": variant === "secondary",
          "border border-gray-200 bg-transparent hover:bg-gray-100 text-gray-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800": variant === "outline",
          "hover:bg-gray-100 text-gray-900 dark:text-white dark:hover:bg-gray-800": variant === "ghost",
          "h-9 px-4 text-sm": size === "sm",
          "h-11 px-8 text-base": size === "md",
          "h-14 px-10 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    />
  );
};
