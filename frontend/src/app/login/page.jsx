"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import api from "../../utils/api";
import useAuthStore from "../../store/authStore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      setAuth(token, user);

      toast.success("Login Successful");

      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">✈ Trao AI</h1>

          <p className="text-slate-400 mt-2">AI Powered Travel Planning</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 border rounded-lg space-y-4"
        >
          <h1 className="text-2xl font-bold">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-3
text-white
outline-none
focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full
bg-slate-800
border
border-slate-700
rounded-xl
p-3
text-white
outline-none
focus:border-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full
bg-blue-600
hover:bg-blue-700
transition
rounded-xl
p-3
font-semibold"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-slate-400">
            Don't have an account?
            <Link href="/register" className="text-blue-400 ml-2">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
