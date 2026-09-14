"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextValue {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
}

function Tabs({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  className,
  children,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onValueChange?.(val);
    },
    [isControlled, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-0.5 rounded-[0.9rem] border border-border/70 bg-muted/70 p-1 text-muted-foreground shadow-[inset_0_1px_2px_rgb(0_0_0_/0.05)]",
        className
      )}
      role="tablist"
      {...props}
    />
  );
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({
  value,
  className,
  children,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useTabs();
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-[0.7rem] px-3.5 py-1.5 text-sm font-medium tracking-[-0.01em] ring-offset-background transition-[color,background-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
        isActive
          ? "bg-background/95 text-foreground shadow-[0_1px_2px_rgb(0_0_0_/0.08),0_2px_6px_rgb(0_0_0_/0.05)] font-semibold"
          : "hover:bg-background/55 hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value: activeValue } = useTabs();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("mt-5 ring-offset-background focus-visible:outline-none motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:duration-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
