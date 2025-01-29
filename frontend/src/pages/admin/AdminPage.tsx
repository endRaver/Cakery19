import SectionLoader from "@/components/SectionLoader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableCaption,
} from "@/components/ui/table";
import { useProductStore } from "@/stores/useProductStore";
import { Product } from "@/types";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [deletedProductId, setDeletedProductId] = useState<string | null>(null);
  const { isLoading, products, fetchProducts, isDeleting, handleDeleteProduct } = useProductStore();

  const convertDate = (date: string | undefined) => {
    if (!date) return "";
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return formattedDate;
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProductById = async (product: Product) => {
    setDeletedProductId(product._id);
    handleDeleteProduct(product);
  };

  if (isLoading) {
    return <SectionLoader />;
  }

  return (
    <Table className="border bg-white">
      <TableCaption>A list of Cakery19 products.</TableCaption>
      <TableHeader className="bg-[#89896E]">
        <TableRow>
          <TableHead className="w-32 text-white">Product Id</TableHead>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Sizes</TableHead>
          <TableHead className="text-right text-white">Prices</TableHead>
          <TableHead className="text-right text-white">Created at</TableHead>
          <TableHead className="text-right text-white">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product._id}
            className="cursor-pointer"
            onClick={() => (window.location.href = `/admin/edit/${product._id}`)}
          >
            <TableCell className="font-medium">{product._id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.variants.map((v) => v.size).join(", ")}</TableCell>
            <TableCell className="text-right">
              {product.variants.map((v) => v.price).join(", ")}
            </TableCell>
            <TableCell className="text-right">{convertDate(product?.createdAt)}</TableCell>
            <TableCell className="text-right">
              <Button
                type="button"
                className="w-fit self-center border border-primary-400 bg-primary-300 hover:bg-primary-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProductById(product);
                }}
                disabled={isDeleting && deletedProductId === product._id}
              >
                {isDeleting && deletedProductId === product._id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminPage;
