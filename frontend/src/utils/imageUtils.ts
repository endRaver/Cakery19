export const optimizeImageUrl = (url: string, width: number = 800) => {
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
