import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useUserStore } from "@/stores/useUserStore";

import { Button } from "@/components/ui/button";
import { Lock, Mail, EyeOff, Eye, Loader2 } from "lucide-react";

import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import FullWidthBanner from "@/components/FullWidthBanner";
import ResetPasswordModal from "./components/ResetPasswordModal";

type AuthForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type FormResponse = {
  success: boolean;
  message: string;
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AuthForm>();

  const { handleLogin, loading } = useUserStore();

  const onSubmit = async (data: AuthForm) => {
    try {
      const res = (await handleLogin(data)) as unknown as FormResponse;
      if (res.success) {
        reset();
        window.location.reload();
      } else {
        setError("email", { message: res.message });
      }
    } catch {
      setError("email", { message: "Login failed" });
    }
  };

  return (
    <main className="my-10 space-y-10 text-primary-300">
      <section className="container mx-auto flex flex-col justify-between gap-10 md:flex-row">
        <picture className="flex-1">
          <source srcSet={`/images/webp/login_banner.webp`} type="image/webp" />
          <img
            src={`/images/webp/login_banner.jpg`}
            alt={"login_banner"}
            loading="eager"
            className="fade-in-image aspect-square w-full object-cover object-center"
            onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
          />
        </picture>

        <div className="flex-1 space-y-3">
          <h1 className="mb-2 text-center text-4xl font-medium">Log in to your account</h1>

          <SignInOAuthButtons />

          <div className="flex items-center justify-center gap-1.5">
            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>

            <span className="text-nowrap px-1 py-2 text-primary-400">or use Email</span>

            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email input */}
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">E-mail</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <Mail className="text-base-content/40 size-5 text-primary-200" />
                </div>

                <input
                  type="text"
                  className="input w-full border-b border-primary-200 bg-transparent py-1 pl-8 text-sm font-medium tracking-widest outline-none placeholder:text-xs placeholder:text-primary-100"
                  placeholder="YOUR EMAIL"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                />
              </div>
            </div>

            {/* Password input */}
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <Lock className="text-base-content/40 size-5 text-primary-200" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full border-b border-primary-200 bg-transparent py-1 pl-8 text-sm font-medium tracking-widest outline-none placeholder:text-xs placeholder:text-primary-100"
                  placeholder="PASSWORD"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="text-base-content/40 size-5" />
                  ) : (
                    <EyeOff className="text-base-content/40 size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm rounded-sm border-primary-200"
                  {...register("rememberMe")}
                />
                <span className="text-sm">Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm text-[#b3801a] hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <div className="space-y-1">
              {errors.email && (
                <p className="mt-2.5 text-sm text-red-500">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="mt-2.5 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button
              className="h-[35px] w-32 rounded-[2px] bg-primary_btn p-1 hover:bg-hover-outline_btn"
              type="submit"
              disabled={loading}
            >
              <p className="flex w-full items-center justify-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium">
                {loading ? <Loader2 className="animate-spin" /> : "Login"}
              </p>
            </Button>
          </form>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Don't have an account?</span>
              <Link
                to="/sign-up"
                className="border-b border-transparent text-sm font-medium tracking-wider duration-300 hover:border-primary-500"
              >
                CREATE AN ACCOUNT
              </Link>
            </div>

            <p className="text-justify text-sm">
              Log in to track orders, save favorites, and connect with us easily. Enjoy a seamless
              shopping experience with exclusive benefits!
            </p>
          </div>
        </div>
      </section>

      <FullWidthBanner
        webpImage="/images/webp/menu_banner.webp"
        jpegImage="/images/menu_banner.jpg"
      />

      <ResetPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </main>
  );
};

export default LoginPage;
