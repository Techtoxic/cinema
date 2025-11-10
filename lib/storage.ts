import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload image to Firebase Storage
 * @param file - File to upload
 * @param path - Storage path (e.g., 'films/', 'photography/', 'blogs/')
 * @param onProgress - Optional progress callback
 * @returns Promise with download URL
 */
export const uploadImage = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const storageRef = ref(storage, `${path}${filename}`);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress tracking
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          // Upload completed
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Delete image from Firebase Storage
 * @param url - Full storage URL of the image to delete
 */
export const deleteImage = async (url: string): Promise<void> => {
  try {
    // Extract the path from the URL
    const urlObj = new URL(url);
    const path = decodeURIComponent(urlObj.pathname.split("/o/")[1].split("?")[0]);
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

/**
 * Validate image file
 * @param file - File to validate
 * @returns Object with isValid and error message
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Invalid file type. Please upload JPEG, PNG, WebP, or GIF images only.",
    };
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "File size too large. Please upload images smaller than 10MB.",
    };
  }

  return { isValid: true };
};

