import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Lock, Mail, EyeOff, Eye, Loader2 } from "lucide-react";

import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import FullWidthBanner from "@/components/FullWidthBanner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
    } catch (error: unknown) {
      const err = error as { errors?: { message: string }[] };
      const errorMessage = err.errors?.[0]?.message || "Sign-in failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mt-10 space-y-10 text-primary-400">
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email input */}
            <div className="form-control space-y-1">
              <label className="label" htmlFor="email">
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password input */}
            <div className="form-control space-y-1">
              <label className="label" htmlFor="password">
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

            <Button
              className="h-[35px] w-32 rounded-[2px] bg-primary_btn p-1 hover:bg-hover-outline_btn"
              disabled={isLoading}
            >
              <p className="flex w-full items-center justify-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium">
                {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
              </p>
            </Button>
          </form>

          <div className="flex w-fit flex-col gap-y-3">
            <a
              href="/sign-up"
              className="w-fit border-b border-transparent text-sm tracking-wider text-[#b3801a] duration-300 hover:border-[#b3801a]"
            >
              Forgot your password?
            </a>

            <Link
              to="/sign-up"
              className="w-fit border-b border-transparent text-sm tracking-wider duration-300 hover:border-primary-500"
            >
              CREATE AN ACCOUNT
            </Link>

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
    </main>
  );
};

export default LoginPage;
