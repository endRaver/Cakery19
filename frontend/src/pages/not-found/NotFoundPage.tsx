import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[500px] items-center justify-center text-primary-400">
      <div className="space-y-4 px-4 text-center">
        {/* Error message */}
        <div className="space-y-4">
          <h1 className="animate-bounce text-7xl font-bold text-primary-200">404</h1>
          <h2 className="text-2xl font-semibold text-primary-200">Page not found</h2>
          <p className="mx-auto max-w-md text-neutral-400">
            Looks like this slice went missing. Let's get you back to the sweetest part!
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full bg-primary-400 text-white hover:bg-primary-300 hover:text-white sm:w-auto"
          >
            Go Back
          </Button>

          <Button
            className="border-2 w-full border-primary-400 bg-transparent px-6 py-2 sm:w-auto text-primary-400 hover:bg-primary-75"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
