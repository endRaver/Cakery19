import { Skeleton } from "../ui/skeleton";

const ProductDisplaySkeleton = () => {
  return (
    <>
      <Skeleton className="h-[480px] w-full rounded-lg xl:h-[592px]"></Skeleton>

      <div className="flex gap-2.5">
        <Skeleton className="aspect-square h-[80px] xl:h-[130px]"></Skeleton>
        <Skeleton className="aspect-square h-[80px] xl:h-[130px]"></Skeleton>
        <Skeleton className="aspect-square h-[80px] xl:h-[130px]"></Skeleton>
      </div>
    </>
  );
};

export default ProductDisplaySkeleton;
