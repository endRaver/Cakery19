const UsersListSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="flex animate-pulse items-center justify-center gap-3 rounded-lg p-3 lg:justify-start"
    >
      <div className="h-8 w-8 rounded-full bg-zinc-300" />
      <div className="h-4 w-28 rounded bg-zinc-300" />
    </div>
  ));
};
export default UsersListSkeleton;
