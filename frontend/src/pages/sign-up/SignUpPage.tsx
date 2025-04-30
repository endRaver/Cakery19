import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import FullWidthBanner from "@/components/FullWidthBanner";
import { useUserStore } from "@/stores/useUserStore";
import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import VerificationDialog from "./components/VerificationDialog";

type AuthForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AuthForm>();

  const { handleSignup, loading } = useUserStore();

  const onSubmit = async ({ email, password, confirmPassword }: AuthForm) => {
    try {
      if (password !== confirmPassword) {
        setError("confirmPassword", { message: "Mật khẩu không khớp" });
        return;
      }

      const { success, message } = await handleSignup({
        email,
        password,
      });

      if (success) {
        setOpenDialog(true);
        reset();
      } else {
        setError("email", { message: message ?? "Failed to sign up" });
      }
    } catch {
      setError("email", { message: "Failed to sign up" });
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
          <h1 className="mb-2 text-center text-4xl font-medium">Create account</h1>

          <SignInOAuthButtons />

          <div className="flex items-center justify-center gap-1.5">
            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>

            <span className="text-nowrap px-1 py-2 text-primary-400">or</span>

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

            {/* Confirm Password input */}
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <Lock className="text-base-content/40 size-5 text-primary-200" />
                </div>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="input w-full border-b border-primary-200 bg-transparent py-1 pl-8 text-sm font-medium tracking-widest outline-none placeholder:text-xs placeholder:text-primary-100"
                  placeholder="CONFIRM PASSWORD"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="text-base-content/40 size-5" />
                  ) : (
                    <EyeOff className="text-base-content/40 size-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {errors.email && (
                <p className="mt-2.5 text-sm text-red-500">{errors.email.message}</p>
              )}
              {errors.password && (
                <p className="mt-2.5 text-sm text-red-500">{errors.password.message}</p>
              )}
              {errors.confirmPassword && (
                <p className="mt-2.5 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              className="h-[35px] w-32 rounded-[2px] bg-primary_btn p-1 hover:bg-hover-outline_btn"
              type="submit"
              disabled={loading}
            >
              <p className="flex w-full items-center justify-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium">
                {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </p>
            </Button>
          </form>
          <VerificationDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />

          <div>
            <span className="text-sm tracking-wider">Already have an account? </span>
            <Link
              to="/login"
              className="border-b border-transparent text-sm font-medium tracking-wider duration-300 hover:border-primary-500"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </section>

      <FullWidthBanner
        webpImage="/images/webp/menu_banner.webp"
        jpegImage="/images/menu_banner.jpg"
      />
    </main>
  );
};

export default SignUpPage;
