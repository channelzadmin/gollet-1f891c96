import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearSelectedMedia = () => {
    setFile(null);
    setPreview("");
  };

  const handleShare = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const isVideo = file.type.startsWith('video/');
      const bucket = isVideo ? 'videos' : 'images';
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      // Insert into database
      const { error: dbError } = await supabase
        .from(isVideo ? 'posts_videos' : 'posts_images')
        .insert(
          isVideo 
            ? {
                video_url: publicUrl,
                caption,
                storage_path: filePath,
                duration: 0
              }
            : {
                image_url: publicUrl,
                caption,
                storage_path: filePath
              }
        );

      if (dbError) throw dbError;

      toast.success("Post shared successfully!");
      navigate("/");
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">New post</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="relative">
          <div 
            className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => !preview && document.getElementById('fileInput')?.click()}
          >
            {preview ? (
              <>
                {file?.type.startsWith('video/') ? (
                  <video
                    src={preview}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <Button
                  variant="secondary"
                  className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('fileInput')?.click();
                  }}
                >
                  Change
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelectedMedia();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Click to upload media
              </div>
            )}
          </div>
        </div>
        
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />

        <Input
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-white"
        />

        <Button 
          onClick={handleShare}
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Share"}
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default NewPost;