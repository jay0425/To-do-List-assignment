"use client";
import React from "react";
import Header from "@/components/layout/Header";
import { cn } from "@/utils/cn";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <React.Fragment>
      <Header className="px-4 md:px-6 xl:px-90" />
      <main className={cn("relative min-w-85.75 h-full flex", "px-4 md:px-6 xl:px-90")}>
        {children}
      </main>
    </React.Fragment>
  );
};

export default MainLayout;
