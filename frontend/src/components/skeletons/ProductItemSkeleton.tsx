import { Skeleton } from "../ui/skeleton";

const ProductItemSkeleton = () => {
  return (
    <div className="flex-1 space-y-2 lg:max-w-[309px] xl:max-w-[373px] 2xl:max-w-[448px]">
      <Skeleton className="h-[380px] w-full bg-cover bg-center bg-no-repeat"></Skeleton>
      <div className="space-y-1">
        <Skeleton className="h-[28px] w-[180px]"></Skeleton>
        <Skeleton className="h-[24px] w-[100px]"></Skeleton>
      </div>
    </div>
  );
};

export default ProductItemSkeleton;
