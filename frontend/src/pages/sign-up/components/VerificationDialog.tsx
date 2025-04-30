import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useCallback, useState, useRef } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { motion } from "framer-motion";
import { CheckCircleIcon, Loader2 } from "lucide-react";

const VerificationDialog = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary-500">Verify Email</DialogTitle>
            <DialogDescription>
              Please enter the code sent to your email address to verify your account.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={openDialog} onOpenChange={setOpenDialog}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default VerificationDialog;

const ProfileForm = ({ className }: React.ComponentProps<"form">) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { handleVerifyEmail, loading } = useUserStore();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      const verifyCode = code.join("");
      const { success, message } = await handleVerifyEmail(verifyCode);

      if (success) {
        setSuccess(true);
        setTimeout(() => {
          setCode(["", "", "", "", "", ""]);
          window.location.href = "/";
        }, 3000);
      } else {
        setError(message ?? "Mã xác thực không hợp lệ");
      }
    },
    [code, handleVerifyEmail, setCode]
  );

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split(""); // 6 is the number of inputs
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Find the first empty input after pasted content
      const firstEmptyIndex = newCode.findIndex((digit) => digit === "");
      const focusIndex = firstEmptyIndex === -1 ? 5 : firstEmptyIndex;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if it's not the last one
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code, handleSubmit]);

  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="flex justify-between">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={digit}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              handleChange(index, value);
            }}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-12 w-12 rounded-lg border-2 border-gray-400 text-center text-2xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        ))}
      </div>

      {error && <p className="mt-2.5 text-sm text-red-500">{error}</p>}

      {!success && (
        <motion.button
          className="mb-2.5 mt-5 flex w-full cursor-pointer justify-center rounded-sm bg-primary_btn py-3 text-sm text-white duration-300 hover:bg-primary_btn/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary_btn"
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Verify code"}
        </motion.button>
      )}

      {success && (
        <motion.button
          className="mb-2.5 mt-5 flex w-full items-center justify-center rounded-sm bg-emerald-500 py-3 text-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-emerald-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircleIcon color="white" />
        </motion.button>
      )}
    </form>
  );
};
