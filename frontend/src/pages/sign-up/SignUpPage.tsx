import React, { useState } from "react";
import { SignedOut, useSignUp } from "@clerk/clerk-react";

import SignInOAuthButtons from "@/components/SignInOAuthButtons";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";
import VerificationCodeDialog from "./components/VerificationCodeDialog";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, isLoaded } = useSignUp();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    if (!isLoaded) return;

    try {
      // Create signup with email and password
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      // // Prepare email verification
      await result.prepareEmailAddressVerification();
      toast.success("Verification code sent. Please check your email.");

      // Open the dialog after successful sign-up
      setIsDialogOpen(true);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      handleSignUp();
    }
  };

  return (
    <main className="my-10 space-y-10 text-primary-300">
      <section className="container mx-auto flex flex-col justify-between gap-10 md:flex-row">
        <div
          style={{ backgroundImage: `url("/images/login_banner.jpg")` }}
          className="aspect-square w-full flex-1 bg-cover bg-center bg-no-repeat"
        />

        <div className="flex-1 space-y-3">
          <h1 className="mb-2 text-center text-4xl font-medium">Create account</h1>

          <SignedOut>
            <SignInOAuthButtons />
          </SignedOut>

          <div className="flex items-center justify-center gap-1.5">
            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>

            <span className="text-nowrap px-1 py-2 text-primary-400">or</span>

            <div className="h-[1px] w-full max-w-[320px] border-t border-primary-400"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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

            {/* <div id="clerk-captcha" /> */}
            <Button
              className="h-[35px] w-32 rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn"
              disabled={isLoading}
            >
              <p className="flex w-full items-center justify-center rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-medium">
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </p>
            </Button>
          </form>

          <div>
            <span className="text-sm tracking-wider">Already have an account? </span>
            <a
              href="/login"
              className="border-b border-transparent text-sm font-medium tracking-wider duration-300 hover:border-primary-500"
            >
              SIGN IN
            </a>
          </div>
        </div>
      </section>

      <section>
        <div
          className="h-[425px] w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/images/menu_banner.jpg")' }}
        ></div>
      </section>

      <VerificationCodeDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </main>
  );
};

export default SignUpPage;
