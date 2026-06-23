"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "@/utils/api";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setAuth(token, user);

      toast.success("Registration Successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
          absolute
          top-0
          left-0
          w-96
          h-96
          bg-blue-600/10
          rounded-full
          blur-3xl
        "
        />

        <div
          className="
          absolute
          bottom-0
          right-0
          w-96
          h-96
          bg-purple-600/10
          rounded-full
          blur-3xl
        "
        />
      </div>

      {/* Register Card */}
      <div
        className="
        relative
        z-10
        w-full
        max-w-md
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-8
        shadow-xl
      "
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">✈ Trao AI</h1>

          <p className="text-slate-400 mt-2">
            Create your account and start planning trips with AI
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 border rounded-lg space-y-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <input
              type="email"
              placeholder="Email Address"
              className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              text-white
              outline-none
              focus:border-blue-500
            "
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="
              w-full
              bg-slate-800
              border
              border-slate-700
              rounded-xl
              p-3
              text-white
              outline-none
              focus:border-blue-500
            "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            disabled:opacity-50
            transition
            rounded-xl
            p-3
            font-semibold
            text-white
          "
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-slate-400">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-400 ml-2 hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
