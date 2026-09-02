interface ExperienceImageProps {
  src: string;
  alt: string;
  background: string;
  aspectRatio?: string | number;
}

export function ExperienceImage({
  src,
  alt,
  background,
  aspectRatio = "16 / 8",
}: ExperienceImageProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background, aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-full w-full object-contain"
      />
    </div>
  );
}
