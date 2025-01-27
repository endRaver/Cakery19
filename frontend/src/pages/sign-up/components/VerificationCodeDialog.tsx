import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useSignUp } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";

interface VerificationCodeDialogProps {
  open: boolean;
  onClose: () => void;
}

const VerificationCodeDialog: React.FC<VerificationCodeDialogProps> = ({ open, onClose }) => {
  const { signUp, isLoaded } = useSignUp();
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCode = async () => {
    if (!isLoaded) return;

    setIsVerifying(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        toast.success("Account verified successfully");
        window.location.href = "/auth-callback";
        onClose();
      }
    } catch (error: unknown) {
      const err = error as { errors?: { message: string }[] };
      const errorMessage = err.errors?.[0]?.message || "Verification failed";
      toast.error(errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    const confirmClose = window.confirm(
      "Are you sure you want to close the verification code dialog? You won't be able to proceed with the verification process."
    );
    if (confirmClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="text-primary-500">Verify Your Email</p>
          </DialogTitle>
          <DialogDescription>
            <p className="text-primary-300">
              Please enter the verification code sent to your email.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-primary-500">
          <div className="w-full">
            <Input
              id="code"
              value={verificationCode}
              placeholder="Enter verification code"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleVerifyCode}
            className="w-20 bg-primary-500 text-primary-50"
            disabled={isVerifying}
          >
            {isVerifying ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationCodeDialog;
