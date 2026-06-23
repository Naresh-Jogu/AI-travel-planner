"use client";

import Link from "next/link";
import { Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    router.push("/login");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-slate-950/80
        backdrop-blur-md
        border-b
        border-slate-800
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-2
          "
        >
          <Plane className="text-blue-500" />

          <span
            className="
              text-xl
              font-bold
              text-white
            "
          >
            Trao AI
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="
      text-slate-300
      hover:text-white
      transition
    "
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="
      bg-red-500
      hover:bg-red-600
      px-4
      py-2
      rounded-lg
      transition
      text-white
      
    "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
