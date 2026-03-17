"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/scenarios", label: "Scenarios" },
  { href: "/scanner", label: "Scanner" },
  { href: "/watchlist", label: "Watchlist" },
  { href: "/daily", label: "Daily Challenge" },
  { href: "/profile", label: "Profile" },
];

export default function Nav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="glass border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
                <span className="text-white font-bold text-sm">OO</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Options Optimized</span>
            </Link>

            {session && (
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    {link.label}
                    {pathname.startsWith(link.href) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full shadow-[0_1px_4px_rgba(37,99,235,0.4)]" />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {session && (
        <div className="md:hidden border-t border-gray-100 px-4 py-2 flex gap-1 overflow-x-auto scrollbar-hide glass">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                pathname.startsWith(link.href)
                  ? "text-blue-700 bg-blue-50"
                  : "text-gray-600"
              )}
            >
              {link.label}
              {pathname.startsWith(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
