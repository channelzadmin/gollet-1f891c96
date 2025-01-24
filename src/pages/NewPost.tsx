import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("/lovable-uploads/5d571f82-5e3c-4a64-b2e9-1b5b1a5421c7.png");
  const navigate = useNavigate();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = () => {
    // Get existing posts from localStorage or initialize empty array
    const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    
    // Add new post
    const newPost = {
      id: Date.now(),
      src: selectedImage,
      alt: "User uploaded image",
      caption: caption
    };
    
    // Save updated posts
    localStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    
    toast.success("Post shared successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">New post</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={selectedImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="imageInput"
        />
        <button 
          onClick={() => document.getElementById("imageInput")?.click()}
          className="text-blue-500 font-medium text-center w-full"
        >
          Change
        </button>

        <Input
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-white"
        />

        <Button 
          onClick={handleShare}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Share
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default NewPost;