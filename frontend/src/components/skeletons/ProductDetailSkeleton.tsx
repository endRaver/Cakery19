import { Skeleton } from "../ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="h-12 w-2/4 rounded-lg xl:h-14"></Skeleton>
        <Skeleton className="h-6 w-32 rounded-lg"></Skeleton>
        <Skeleton className="h-12 w-full rounded-lg"></Skeleton>
      </div>

      <div className="space-y-2.5">
        <Skeleton className="h-20 w-80 rounded-lg"></Skeleton>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-20 w-full rounded-lg"></Skeleton>
      </div>
    </>
  );
};

export default ProductDetailSkeleton;
