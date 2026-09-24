"use client";

import { useState, useRef } from "react";
import { useAdmin } from "./admin-provider";
import { useContent } from "./content-provider";
import Image from "next/image";
import {auth} from "@/lib/firebase";
import { upload } from "@vercel/blob/client";

export function EditableImage({
  path,
  fallbackSrc,
  children,
  className = "",
  collection = "copy"
}: {
  path: string;
  fallbackSrc: string;
  children: React.ReactNode;
  className?: string;
  collection?: "copy" | "site" | "services" | "work" | "apps" | "testimonials" | "technology";
}) {
  const { isAdmin } = useAdmin();
  const { content, updateContent } = useContent();

  const [section, key] = path.split(".");
  const data=content[collection] as unknown as Record<string,unknown>;
  const value=key?(data[section] as Record<string,unknown>)?.[key]:data[section];
  const src=typeof value === "string"?value:fallbackSrc;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAdmin) {
    return <>{children}</>;
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        clientPayload: await auth?.currentUser?.getIdToken(),
        handleUploadUrl: '/api/upload',
      });

      await updateContent(collection, path, newBlob.url);
    } catch (error) {
      console.error("Vercel Blob Upload error:", error);
      alert("Failed to upload image. Please check your Vercel Blob configuration.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative group inline-block ${className}`}>
      {src !== fallbackSrc ? (
        <Image unoptimized width={1200} height={800} src={src} alt="Editable content" className="w-full h-full object-cover" />
      ) : (
        children
      )}

      {/* Admin Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer z-50">
        <button
          className="bg-white text-black text-xs font-semibold px-3 py-1 rounded"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Change Image"}
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
