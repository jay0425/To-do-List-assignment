"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { NoImageIcon } from "public/icons";
import { cn } from "@/utils/cn";
import IconButton from "./IconButton";

interface FileUploadProps {
  imagePreviewUrl?: string;
}

const ALLOWED_IMAGE_EXT = ["jpg", "jpeg", "png", "gif"] as const;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ENGLISH_FILENAME = /^[A-Za-z0-9._-]+$/;

export default function FileUpload({ imagePreviewUrl }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(imagePreviewUrl ?? "");

  useEffect(() => {
    if (!imagePreviewUrl) return;

    if (imageUrl?.startsWith("blob:")) URL.revokeObjectURL(imageUrl);

    setImageUrl(imagePreviewUrl);
  }, [imagePreviewUrl]);

  const hasImage = Boolean(imageUrl);

  const acceptAttr = useMemo(
    () => ALLOWED_IMAGE_EXT.map((ext) => `image/${ext === "jpg" ? "jpeg" : ext}`).join(","),
    [],
  );

  const cleanupBlob = (url?: string) => {
    if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const isValidImage = (f: File) => {
    const name = f.name;
    const ext = (name.split(".").pop() || "").toLowerCase();

    if (!ENGLISH_FILENAME.test(name)) return false;
    if (!ALLOWED_IMAGE_EXT.includes(ext as (typeof ALLOWED_IMAGE_EXT)[number])) return false;
    if (f.size > MAX_SIZE) return false;

    return true;
  };

  const openPicker = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileItem = e.target.files?.item(0);
    if (!fileItem) return;

    if (!isValidImage(fileItem)) {
      alert("이미지(최대 1개)만 가능 / 파일명은 영어만 / 5MB 이하로 업로드 해주세요.");
      e.currentTarget.value = "";
      return;
    }

    cleanupBlob(imageUrl);
    const preview = URL.createObjectURL(fileItem);
    setImageUrl(preview);

    e.currentTarget.value = "";
  };

  useEffect(() => {
    return () => cleanupBlob(imageUrl);
  }, [imageUrl]);

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptAttr}
        onChange={handleFileChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        className={cn(
          "relative w-full h-77.75 rounded-3xl bg-slate-50",
          "border-2 border-dashed border-slate-300 cursor-pointer",
        )}
        style={
          hasImage
            ? {
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {!hasImage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <NoImageIcon className="w-16 h-16" />
          </div>
        )}

        <div className="absolute right-4 bottom-4 flex items-center justify-center">
          {!hasImage ? (
            <IconButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              aria-label="이미지 업로드"
            />
          ) : (
            <IconButton
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openPicker();
              }}
              colors="slate"
              iconType="pencil"
              aria-label="이미지 변경"
            />
          )}
        </div>
      </div>
    </div>
  );
}
