import SectionLoader from "@/components/SectionLoader";
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
import { useEffect } from "react";

const AdminPage = () => {
  const { isLoading, products, fetchProducts } = useProductStore();

  const convertDate = (date: string | undefined) => {
    if (!date) return "";
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    return formattedDate;
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id} className="cursor-pointer">
            <TableCell className="font-medium">{product._id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.variants.map((v) => v.size).join(", ")}</TableCell>
            <TableCell className="text-right">
              {product.variants.map((v) => v.price).join(", ")}
            </TableCell>
            <TableCell className="text-right">{convertDate(product?.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminPage;
