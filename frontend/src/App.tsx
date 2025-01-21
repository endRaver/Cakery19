import { UserButton } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <header>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  );
}

export default App;
