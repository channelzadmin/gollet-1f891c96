import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const ImageCard = ({ src, alt, caption, className }: ImageCardProps) => {
  return (
    <div className={cn("w-full rounded-lg overflow-hidden shadow-sm bg-white", className)}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-auto object-cover aspect-square"
      />
      {caption && (
        <div className="p-4">
          <p className="text-gray-900 text-sm">{caption}</p>
        </div>
      )}
    </div>
  );
};