import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const variants = {
            default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
            outline: "border-2 border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:bg-slate-900 hover:border-slate-300 text-slate-900 dark:text-white",
            ghost: "hover:bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
            link: "text-blue-600 underline-offset-4 hover:underline",
            secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200",
            destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md",
        };

        const sizes = {
            default: "h-10 px-6 py-2",
            sm: "h-9 rounded-xl px-4",
            lg: "h-14 rounded-2xl px-10 text-base font-bold",
            icon: "h-10 w-10 p-2",
        };

        const classes = cn(
            "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            sizes[size],
            className
        );

        if (asChild && React.isValidElement(props.children)) {
            const child = props.children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
            return React.cloneElement(child, {
                className: cn(classes, child.props.className),
                ...props,
                children: child.props.children,
            } as any);
        }

        return (
            <button
                className={classes}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
