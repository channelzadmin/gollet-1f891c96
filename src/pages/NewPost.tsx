import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const NewPost = () => {
  const [caption, setCaption] = useState("");
  const [previewImage, setPreviewImage] = useState("/lovable-uploads/5d571f82-5e3c-4a64-b2e9-1b5b1a5421c7.png");

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">New post</h1>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
          <img
            src={previewImage}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        
        <button className="text-blue-500 font-medium text-center w-full">
          Change
        </button>

        <Input
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-white"
        />

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Share
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};

export default NewPost;