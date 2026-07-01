"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RouteChromeProps = {
  children: ReactNode;
  publicChrome: ReactNode;
};

export function RouteChrome({ children, publicChrome }: RouteChromeProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return <>{publicChrome}</>;
}
