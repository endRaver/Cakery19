import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import { Button } from "@/components/ui/button";
import { SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Eye } from "lucide-react";

import { EyeOff } from "lucide-react";

import { Lock, Mail } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <main className="container mx-auto my-10 space-y-10 text-primary-300">
      <section className="flex justify-between gap-10">
        <div
          style={{ backgroundImage: `url("/images/login_banner.jpg")` }}
          className="aspect-square w-full flex-1 bg-cover bg-center bg-no-repeat"
        />

        <div className="flex-1 space-y-3">
          <h1 className="mb-2 text-4xl font-medium">Log in to your account</h1>

          <SignedOut>
            <SignInOAuthButtons />
          </SignedOut>

          <SignOutButton redirectUrl="/login" />

          {/* <UserButton afterSignOutUrl="/login" /> */}

          <div className="flex items-center justify-center gap-1.5">
            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>

            <span className="text-nowrap px-1 py-2 text-primary-400">or</span>

            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

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

            <Button className="h-[35px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn">
              <p className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium">
                Login
              </p>
            </Button>
          </form>

          <div>
            <a
              href="/signup"
              className="border-b border-transparent text-sm tracking-wider duration-300 hover:border-primary-500"
            >
              CREATE AN ACCOUNT
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
