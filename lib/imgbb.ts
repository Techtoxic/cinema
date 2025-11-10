/**
 * ImgBB Image Upload Service
 * Free tier: Unlimited uploads
 * No credit card required!
 */

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload";

export interface ImgBBUploadResponse {
  data: {
    id: string;
    title: string;
    url_viewer: string;
    url: string;
    display_url: string;
    width: number;
    height: number;
    size: number;
    time: number;
    expiration: number;
    image: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    thumb: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    medium: {
      filename: string;
      name: string;
      mime: string;
      extension: string;
      url: string;
    };
    delete_url: string;
  };
  success: boolean;
  status: number;
}

/**
 * Upload image to ImgBB
 * @param file - File to upload
 * @param onProgress - Progress callback (0-100)
 * @returns Promise with image URL
 */
export const uploadToImgBB = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> => {
  if (!IMGBB_API_KEY) {
    throw new Error(
      "ImgBB API key not found. Please add NEXT_PUBLIC_IMGBB_API_KEY to your .env.local file"
    );
  }

  try {
    // Convert file to base64
    const base64 = await fileToBase64(file);
    
    // Remove data:image/...;base64, prefix
    const base64Data = base64.split(",")[1];

    // Create form data
    const formData = new FormData();
    formData.append("key", IMGBB_API_KEY);
    formData.append("image", base64Data);
    formData.append("name", file.name.replace(/\.[^/.]+$/, "")); // filename without extension

    // Upload with progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100;
          onProgress(progress);
        }
      });

      // Handle completion
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response: ImgBBUploadResponse = JSON.parse(xhr.responseText);
            if (response.success) {
              // Return the direct image URL
              resolve(response.data.display_url);
            } else {
              reject(new Error("ImgBB upload failed"));
            }
          } catch (err) {
            reject(new Error("Failed to parse ImgBB response"));
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      // Handle errors
      xhr.addEventListener("error", () => {
        reject(new Error("Network error during upload"));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload cancelled"));
      });

      // Send request
      xhr.open("POST", IMGBB_UPLOAD_URL);
      xhr.send(formData);
    });
  } catch (error) {
    console.error("ImgBB upload error:", error);
    throw error;
  }
};

/**
 * Convert File to base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validate image file
 * @param file - File to validate
 * @returns Object with isValid and error message
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/bmp"];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload JPG, PNG, WebP, GIF, or BMP images only.",
    };
  }

  // Check file size (ImgBB free tier max: 32MB, but we'll keep it reasonable at 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size too large. Please upload images smaller than 10MB.",
    };
  }

  return { isValid: true };
};

/**
 * Delete image from ImgBB (requires delete URL from upload response)
 * Note: ImgBB free tier doesn't support API deletion
 * Images can be deleted manually from ImgBB dashboard
 */
export const deleteFromImgBB = async (deleteUrl: string): Promise<void> => {
  console.log("ImgBB deletion requires manual action at:", deleteUrl);
  // ImgBB free tier doesn't support API deletion
  // Users need to delete manually from their dashboard if needed
};

