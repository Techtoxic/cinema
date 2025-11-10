"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, Image as ImageIcon, Loader } from "lucide-react";
import { uploadToImgBB, validateImageFile } from "@/lib/imgbb";

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (url: string) => void;
  storagePath: string;
  label?: string;
}

export default function ImageUpload({
  currentImage,
  onImageChange,
  storagePath,
  label = "Image",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState(currentImage || "");
  const [useUrl, setUseUrl] = useState(!currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || "Invalid file");
      return;
    }

    setError("");
    setUploading(true);
    setUploadProgress(0);

    try {
      console.log("Starting ImgBB upload for:", file.name);
      const url = await uploadToImgBB(file, (progress) => {
        console.log("Upload progress:", progress);
        setUploadProgress(progress);
      });
      console.log("Upload complete, URL:", url);
      setImageUrl(url);
      onImageChange(url);
      setUseUrl(false);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload image. Check your ImgBB API key in .env.local");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    onImageChange(url);
  };

  const handleRemove = () => {
    setImageUrl("");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>
        {label} *
      </label>

      {/* Toggle between Upload and URL */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUseUrl(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            !useUrl
              ? "text-white"
              : "border"
          }`}
          style={
            !useUrl
              ? {
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                }
              : {
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)"
                }
          }
        >
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => setUseUrl(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            useUrl
              ? "text-white"
              : "border"
          }`}
          style={
            useUrl
              ? {
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))"
                }
              : {
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)"
                }
          }
        >
          Use URL
        </button>
      </div>

      {!useUrl ? (
        /* Upload Section */
        <div className="space-y-4">
          <div
            className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-solid"
            style={{
              borderColor: error ? "#ef4444" : "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {uploading ? (
              <div className="space-y-4">
                <Loader className="animate-spin mx-auto" size={48} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="text-sm mb-2" style={{ color: "var(--color-text)" }}>
                    Uploading... {Math.round(uploadProgress)}%
                  </p>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>
            ) : imageUrl ? (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-w-full max-h-64 mx-auto rounded-2xl object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="mx-auto" style={{ color: "var(--color-text-secondary)" }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                    PNG, JPG, WEBP up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* URL Section */
        <div className="space-y-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full max-h-64 rounded-lg object-cover"
                onError={() => setError("Invalid image URL")}
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

