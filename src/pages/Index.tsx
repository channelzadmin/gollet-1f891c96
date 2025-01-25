import { ImageCard } from "@/components/ImageCard";
import { BottomNav } from "@/components/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  image_url?: string;
  video_url?: string;
  caption?: string;
  created_at: string;
}

const Index = () => {
  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ['posts-images'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['posts-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts_videos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleShare = async (url: string, caption?: string) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this post on Gollet',
          text: caption || 'Check out this post on Gollet',
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">Gollet</h1>
        <Tabs defaultValue="foryou" className="w-full">
          <TabsList className="w-full justify-center fixed bg-white border-b">
            <TabsTrigger value="foryou">For You</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      
      <main className="pt-32">
        <TabsContent value="foryou" className="mt-6">
          <div className="max-w-lg mx-auto px-4 space-y-6">
            {imagesLoading ? (
              <div>Loading...</div>
            ) : (
              images?.map((post) => (
                <div key={post.id} className="space-y-2">
                  <ImageCard
                    src={post.image_url}
                    alt={`Post ${post.id}`}
                    caption={post.caption}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center gap-2 text-gray-600"
                    onClick={() => handleShare(post.image_url, post.caption)}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="reels" className="mt-6">
          <div className="max-w-lg mx-auto px-4 space-y-6">
            {videosLoading ? (
              <div>Loading...</div>
            ) : (
              videos?.map((post) => (
                <div key={post.id} className="space-y-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-black">
                    <video
                      src={post.video_url}
                      controls
                      className="w-full h-full object-contain"
                    />
                    {post.caption && (
                      <p className="text-sm text-gray-600 mt-2">{post.caption}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center gap-2 text-gray-600"
                    onClick={() => handleShare(post.video_url, post.caption)}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;