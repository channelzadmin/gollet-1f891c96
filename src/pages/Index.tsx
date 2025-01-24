import { ImageCard } from "@/components/ImageCard";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(savedPosts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">For you</h1>
      </header>
      
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {posts.map((post) => (
          <ImageCard
            key={post.id}
            src={post.src}
            alt={post.alt}
            caption={post.caption}
          />
        ))}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;