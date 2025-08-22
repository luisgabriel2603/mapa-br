import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

function ToastViewport({
    className,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Viewport>) {
    return (
        <ToastPrimitives.Viewport
            className={cn(
                "fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
                className,
            )}
            {...props}
        />
    );
}

const toastVariants = cva(
    "group data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-slate-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[swipe=end]:animate-out data-[swipe=move]:transition-none dark:border-slate-800",
    {
        variants: {
            variant: {
                default:
                    "border border-accent/50 bg-base-100 sedam:bg-white text-base-content dark:bg-slate-950 dark:text-slate-50",
                destructive:
                    "destructive group border-error sedam:border-red-700 bg-error text-error-content dark:border-red-900 dark:bg-red-900 dark:text-slate-50 dark:text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

function Toast({
    className,
    variant,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>) {
    return (
        <ToastPrimitives.Root
            className={cn(toastVariants({ variant }), className)}
            {...props}
        />
    );
}

function ToastAction({
    className,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Action>) {
    return (
        <ToastPrimitives.Action
            className={cn(
                "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-white/75 bg-transparent px-3 font-medium text-sm ring-offset-white transition-colors hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-slate-100/40 focus:group-[.destructive]:ring-red-500 hover:group-[.destructive]:border-red-500/30 hover:group-[.destructive]:bg-red-500 hover:group-[.destructive]:text-slate-50 dark:border-slate-800 dark:ring-offset-slate-950 dark:group-[.destructive]:border-slate-800/40 dark:focus:ring-slate-300 dark:focus:group-[.destructive]:ring-red-900 dark:hover:bg-slate-800 dark:hover:group-[.destructive]:border-red-900/30 dark:hover:group-[.destructive]:bg-red-900 dark:hover:group-[.destructive]:text-slate-50",
                className,
            )}
            {...props}
        />
    );
}

function ToastClose({
    className,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Close>) {
    return (
        <ToastPrimitives.Close
            className={cn(
                "absolute top-2 right-2 cursor-pointer rounded-md p-1 text-black opacity-0 transition-opacity hover:text-slate-950 focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600 hover:group-[.destructive]:text-red-50 dark:text-slate-50/50 dark:hover:text-slate-50",
                className,
            )}
            toast-close=""
            {...props}
        >
            <X className="h-4 w-4" />
        </ToastPrimitives.Close>
    );
}

function ToastTitle({
    className,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Title>) {
    return (
        <ToastPrimitives.Title
            className={cn("mb-3 font-semibold text-sm", className)}
            {...props}
        />
    );
}

function ToastDescription({
    className,
    ...props
}: React.ComponentProps<typeof ToastPrimitives.Description>) {
    return (
        <ToastPrimitives.Description
            className={cn("text-sm opacity-90", className)}
            {...props}
        />
    );
}

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    type ToastActionElement,
    type ToastProps,
};
