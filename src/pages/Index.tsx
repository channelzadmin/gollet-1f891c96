import { ImageCard } from "@/components/ImageCard";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  // Mock data - in a real app this would come from an API
  const posts = [
    {
      id: 1,
      src: "/lovable-uploads/3850c823-e722-40bd-96b7-01e03b233f1e.png",
      alt: "Person sitting on field",
      caption: "Perfect day for outdoor activities"
    },
    {
      id: 2,
      src: "/lovable-uploads/5d571f82-5e3c-4a64-b2e9-1b5b1a5421c7.png",
      alt: "Colorful flowers",
      caption: "Beautiful spring flowers in bloom"
    }
  ];

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