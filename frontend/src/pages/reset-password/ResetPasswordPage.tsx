import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "@/stores/useUserStore";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { loading, handleResetPassword } = useUserStore();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please enter all information");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!token) {
      toast.error("Invalid token");
      return;
    }

    const result = await handleResetPassword(token, password);
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[70vh] bg-primary-50">
      <div className="container mx-auto mt-10 flex items-center justify-center p-4">
        <div className="flex w-full max-w-4xl items-center justify-center gap-8">
          <Card className="w-full max-w-md border-primary-200 bg-white/80 shadow-xl backdrop-blur-sm">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="rounded-full bg-primary-100 p-4 shadow-lg">
                  <Lock className="h-8 w-8 text-primary-400" />
                </div>
              </div>
              <CardTitle className="text-center text-3xl font-semibold text-primary-400">
                Reset Your Password
              </CardTitle>
              <CardDescription className="text-center text-primary-300">
                Enter your new password below to reset your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-primary-400">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-primary-200 bg-white px-4 py-3 pr-12 text-primary-400 shadow-sm transition-all duration-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
                      placeholder="Enter your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-400"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-primary-400">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-primary-200 bg-white px-4 py-3 pr-12 text-primary-400 shadow-sm transition-all duration-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-200"
                      placeholder="Confirm your new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-400"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary-300 py-6 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:bg-primary-400 hover:shadow-xl"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Reset Password"}
                  </Button>

                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="flex items-center gap-2 text-sm text-primary-300 transition-all duration-200 hover:text-primary-400 hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Login
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
