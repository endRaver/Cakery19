import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const AdminEditPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-full rounded bg-white px-6 py-8 shadow">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          {/* Name */}
          <div className="w-full space-y-8">
            <div className="form-control w-full space-y-2">
              <label htmlFor="name">Name *</label>
              <Input
                type="name"
                id="name"
                placeholder="Name"
                className="w-full max-w-[460px] border-primary-400"
              />
            </div>

            <div className="form-control w-full space-y-2">
              <label htmlFor="picture">Description *</label>
              <Textarea
                placeholder="Type your description here."
                className="w-full max-w-[460px] border-primary-400"
              />
            </div>

            <div className="form-control w-full max-w-[460px]">
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEditPage;
