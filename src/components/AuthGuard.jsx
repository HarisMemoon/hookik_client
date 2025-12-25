"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Define public routes that should not be protected
    const publicPaths = ["/login"];

    // If route is public, allow
    if (publicPaths.includes(pathname)) {
      setChecked(true);
      return;
    }

    // Check token from localStorage (or sessionStorage)
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("admin_token")
        : null;

    if (!token) {
      // Not authenticated — redirect to login
      router.replace("/login");
      return;
    }

    // Optionally: verify token structure locally or call an endpoint to validate
    // For now, we accept token presence as authenticated
    setChecked(true);
  }, [pathname, router]);

  // While checking, render nothing (or a spinner)
  if (!checked) return null;

  return <>{children}</>;
}
