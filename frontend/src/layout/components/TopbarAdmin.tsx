import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/useUserStore";
import { useState } from "react";

const TopbarAdmin = () => {
  const [searchInput, setSearchInput] = useState("");
  const { user } = useUserStore();

  return (
    <div className="flex items-center justify-between gap-20">
      <Input
        placeholder="Search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <div className="flex items-center gap-4">
        {user && <p>{user.name || user.email.split("@")[0]}</p>}
      </div>
    </div>
  );
};

export default TopbarAdmin;
