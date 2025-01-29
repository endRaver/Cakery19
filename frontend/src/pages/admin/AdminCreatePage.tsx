import { useRef, useState } from "react";
import { times, filter, map, isEmpty } from "lodash";
import toast from "react-hot-toast";

import { useProductStore } from "@/stores/useProductStore";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import VariantComponent from "./components/VariantComponent";
import MultiSelectDropdown from "@/components/MutiSelectDropdown";

import { Variant } from "@/types";
import { Loader2, TrashIcon } from "lucide-react";

const options = ["signature", "delicacies", "cakes"];

export interface NewProduct {
  name: string;
  description: string;
  category: string[];
  variants: Variant[];
}

const AdminCreatePage = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const [variantAmount, setVariantAmount] = useState(1);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    category: [],
    variants: [
      {
        size: "",
        price: 0,
        portionSize: {
          from: 0,
          to: 0,
        },
      },
    ],
  });

  const { isLoading, handleCreateProduct } = useProductStore();

  const handleAddVariant = () => {
    setVariantAmount((prevAmount) => prevAmount + 1);

    setNewProduct((prevData) => ({
      ...prevData,
      variants: [
        ...prevData.variants,
        {
          size: "",
          price: 0,
          portionSize: {
            from: 0,
            to: 0,
          },
        },
      ],
    }));
  };

  const handleReset = () => {
    setNewProduct({
      name: "",
      description: "",
      category: [],
      variants: [
        {
          size: "",
          price: 0,
          portionSize: {
            from: 0,
            to: 0,
          },
        },
      ],
    });
    setImages([]);
    setVariantAmount(1);
  };

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = images.length + selectedFiles.length;

    // Check for total file limit
    if (totalFiles > 5) {
      toast.error("You can only upload a maximum of 5 files.");
      return;
    }

    // Check for individual file size limit (5MB)
    const oversizedFiles = selectedFiles.filter((file) => file.size > 5 * 1024 * 1024); // 5MB in bytes
    if (oversizedFiles.length > 0) {
      toast.error("Each file must be less than 5MB.");
      return;
    }

    setImages([...images, ...selectedFiles]);
    e.target.value = "";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmpty(images)) return toast.error("Please upload at least one image.");

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("category", JSON.stringify(newProduct.category));
    formData.append("variants", JSON.stringify(newProduct.variants));

    images.forEach((image, index) => {
      formData.append(`imageFiles[${index}]`, image);
    });

    handleCreateProduct(formData);

    handleReset();
  };

  return (
    <div className="h-full overflow-auto rounded bg-white px-6 py-8 shadow">
      <h1 className="mb-4 text-center text-2xl font-medium tracking-wider text-primary-500">
        PRODUCT INFORMATION
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-8">
          <div className="w-full space-y-8">
            {/* Name */}
            <div className="form-control w-full space-y-2">
              <label htmlFor="name">Name *</label>
              <Input
                type="name"
                id="name"
                placeholder="Name"
                className="w-full max-w-[460px] border-primary-400"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="form-control w-full space-y-2">
              <label htmlFor="description">Description *</label>
              <Textarea
                id="description"
                placeholder="Type your description here."
                className="w-full max-w-[460px] border-primary-400"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="form-control w-full max-w-[460px] space-y-2">
              <label htmlFor="picture">Category</label>
              <MultiSelectDropdown
                options={options}
                selectedOptions={newProduct.category}
                onChange={(selectedOptions) =>
                  setNewProduct({ ...newProduct, category: selectedOptions })
                }
              />
            </div>
          </div>

          <div className="w-full">
            <h4 className="mb-4 text-center text-lg font-medium">Price</h4>

            <div className="space-y-6">
              {times(variantAmount, (index: number) => (
                <VariantComponent
                  key={index}
                  index={index}
                  isAbleToDelete={index === variantAmount - 1 && variantAmount > 1}
                  onDelete={() => {
                    setVariantAmount(variantAmount - 1);
                    setNewProduct((prevData) => ({
                      ...prevData,
                      variants: filter(prevData.variants, (_: Variant, i: number) => i !== index),
                    }));
                  }}
                  product={newProduct}
                />
              ))}

              <div className="flex justify-center">
                <Button
                  type="button"
                  className="h-fit self-center border border-primary-400 bg-primary-300 px-2 hover:bg-primary-400"
                  onClick={handleAddVariant}
                >
                  + Add another variant
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            multiple
            onChange={(e) => handleUploadImages(e)}
          />

          <Button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="h-[35px] rounded-[2px] bg-[#89896E] p-1 hover:bg-hover-outline_btn"
          >
            <p className="rounded-[2px] border border-primary-50/40 px-5 py-1.5 text-xs font-normal">
              UPLOAD IMAGE
            </p>
          </Button>

          <div className="flex h-[250px] w-full max-w-[780px] overflow-x-auto bg-primary-50 p-4">
            <div className="flex h-full flex-nowrap items-center gap-2">
              {isEmpty(images) ? (
                <div className="flex h-full flex-grow items-center justify-center">
                  <p className="w-full text-center text-lg font-medium text-primary-200">
                    Upload at least one photo
                  </p>
                </div>
              ) : (
                map(images, (image, index) => (
                  <div key={index} className="relative h-[220px] w-[220px] overflow-hidden rounded">
                    <Button
                      type="button"
                      onClick={() => setImages(filter(images, (_: File, i: number) => i !== index))}
                      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary-400"
                    >
                      <TrashIcon className="h-4 w-4 text-white" />
                    </Button>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded image ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              type="button"
              className="h-fit self-center border border-primary-400 bg-primary-50 px-4 text-primary-400 hover:bg-primary-75"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-[136px] self-center border border-primary-400 bg-primary-300 px-4 hover:bg-primary-400"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mx-2 mt-1 animate-spin" /> : "Create Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCreatePage;
