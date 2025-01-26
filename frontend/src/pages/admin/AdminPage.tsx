import { useAuthStore } from "@/stores/useAuthStore";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return <div>AdminPage</div>;
};

export default AdminPage;
