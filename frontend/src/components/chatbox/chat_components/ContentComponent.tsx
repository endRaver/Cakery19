import { Message } from "@/types/product";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/stores/useChatStore";
import { isEmpty, map } from "lodash";
import { useUserStore } from "@/stores/useUserStore";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const optimizeImageUrl = (url: string, width: number = 800) => {
  // Check if it's already a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    // Extract the base URL and transformation string
    const urlParts = url.split("/upload/");
    if (urlParts.length === 2) {
      // Add or update width transformation
      return `${urlParts[0]}/upload/w_${width},q_auto,f_auto/${urlParts[1]}`;
    }
  }
  return url; // Return original URL if not Cloudinary or invalid format
};

const ContentComponent = ({
  message,
  children,
}: {
  message: Message;
  children?: React.ReactNode;
}) => {
  const { user } = useUserStore();
  const { messages } = useChatStore();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Image Content area */}
      {message.content.images.length > 0 &&
        map(message.content.images, (image, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 ${
              message.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
            ref={messageEndRef}
          >
            <div
              className={`max-w-[70%] rounded p-3 ${
                message.senderId === user?.id
                  ? "bg-primary-300 text-white"
                  : "bg-primary-50 text-black"
              }`}
            >
              <a href={image} target="_blank" rel="noopener noreferrer">
                <picture>
                  <source srcSet={optimizeImageUrl(image)} type="image/webp" />
                  <img
                    src={optimizeImageUrl(image)}
                    alt={image}
                    loading="lazy"
                    className="fade-in-image max-h-[300px] max-w-[160px] object-cover object-center"
                    onLoad={(e) => (e.target as HTMLImageElement).classList.add("loaded")}
                  />
                </picture>
              </a>
              <span
                className={`mt-1 block text-[10px] text-primary-300 ${
                  message.senderId === user?.id
                    ? "bg-primary-300 text-right text-white"
                    : "bg-primary-50 text-black"
                }`}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
          </div>
        ))}

      {/* Text Content area */}
      {!isEmpty(message.content.text) && (
        <div
          key={message._id}
          className={`flex items-center gap-3 ${
            message.senderId === user?.id ? "justify-end" : "justify-start"
          }`}
          ref={messageEndRef}
        >
          <div
            className={`max-w-[70%] rounded p-3 ${
              message.senderId === user?.id
                ? "bg-primary-300 text-white"
                : "bg-primary-50 text-black"
            }`}
          >
            <p className="text-sm">{!isEmpty(message.content.text) && message.content.text}</p>

            {children}
            <span
              className={`mt-1 block text-[10px] text-primary-300 ${
                message.senderId === user?.id
                  ? "bg-primary-300 text-right text-white"
                  : "bg-primary-50 text-black"
              }`}
            >
              {formatTime(message.createdAt)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentComponent;
