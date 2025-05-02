import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/useUserStore";
import toast from "react-hot-toast";

type ResetPasswordForm = {
  email: string;
};

const ResetPasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordForm>();

  const { handleForgetPassword, loading } = useUserStore();

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      const result = await handleForgetPassword(data.email);
      if (result.success) {
        toast.success("Password reset link has been sent to your email");
        reset();
        onClose();
      } else {
        toast.error(result.message ?? "Failed to send reset link");
      }
    } catch {
      toast.error("An error occurred while sending the reset link");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-primary-200 bg-primary-50 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-primary-400">
            Reset Password
          </DialogTitle>
          <DialogDescription className="text-primary-300">
            Enter your email address and we'll send you a link to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-primary-400">
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <Mail className="text-base-content/40 size-5 text-primary-200" />
              </div>
              <input
                id="email"
                type="email"
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
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-primary-200 text-primary-400 hover:bg-primary-75"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary-300 text-white hover:bg-primary-400"
              disabled={loading}
            >
              Send Reset Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
