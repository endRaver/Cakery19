import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { filter, isEmpty } from "lodash";
import { Image, Loader, Send, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

interface ImageWithUrl extends File {
  preview?: string;
}

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { isUploadingImages, selectedUser, sendMessage, handleClearNotifications } = useChatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageWithUrl[]>([]);

  const handleSend = () => {
    if (!user || !selectedUser || (!newMessage && isEmpty(images))) return;
    sendMessage(
      selectedUser.clerkId,
      user.id,
      newMessage.trim(),
      images.map((image) => image as File)
    );
    setNewMessage("");
    setImages([]);
  };

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as ImageWithUrl[];
    const totalFiles = images.length + selectedFiles.length;

    if (totalFiles > 5) {
      toast.error("You can only upload a maximum of 5 files.");
      return;
    }

    // Check for individual file size limit (5MB)
    const oversizedFiles = selectedFiles.filter((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("Each file must be less than 5MB.");
      return;
    }

    // Create object URLs for the new files
    selectedFiles.forEach((file) => {
      file.preview = URL.createObjectURL(file);
    });

    setImages((prev) => [...prev, ...selectedFiles]);
    e.target.value = "";
  };

  // Clean up object URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      // Revoke the data uris to avoid memory leaks
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [images]);

  return (
    <div className="border-t border-primary-75 p-2">
      {!isEmpty(images) && (
        <div className="mb-3 flex items-center gap-2">
          {images.map((image, index) => (
            <div className="relative" key={index}>
              <img
                src={image.preview}
                alt="Preview"
                className="h-12 w-12 rounded-lg border border-zinc-700 object-cover"
                loading="lazy"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <button
                onClick={() =>
                  setImages(filter(images, (_: ImageWithUrl, i: number) => i !== index))
                }
                className="bg-base-300 absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-zinc-600 bg-opacity-80 text-white duration-300 hover:bg-opacity-100"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border-none bg-zinc-100"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          onClick={() => {
            if (selectedUser) handleClearNotifications(selectedUser);
          }}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          multiple
          onChange={(e) => handleUploadImages(e)}
        />

        <div className="flex gap-1">
          <Button
            className="rounded-full bg-transparent px-3 text-primary-500 hover:bg-primary-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="size-4" />
          </Button>

          <Button
            className="bg-primary-300 px-3"
            onClick={handleSend}
            disabled={!newMessage.trim() && isEmpty(images)}
          >
            {isUploadingImages ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
