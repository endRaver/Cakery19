interface ImageOptimizationOptions {
  width?: number;
  quality?: number;
  format?: "auto" | "webp" | "jpg" | "png";
}

export const optimizeImageUrl = (url: string, options: ImageOptimizationOptions = {}) => {
  const { width = 800, quality = "auto", format = "auto" } = options;

  // Check if it's already a Cloudinary URL
  if (url.includes("cloudinary.com")) {
    // Extract the base URL and transformation string
    const urlParts = url.split("/upload/");
    if (urlParts.length === 2) {
      // Add or update transformations
      return `${urlParts[0]}/upload/w_${width},q_${quality},f_${format}/${urlParts[1]}`;
    }
  }
  return url; // Return original URL if not Cloudinary or invalid format
};
