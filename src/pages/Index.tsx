import { ImageCard } from "@/components/ImageCard";
import { BottomNav } from "@/components/BottomNav";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 bg-white border-b z-10">
        <h1 className="text-xl font-semibold text-center py-4">Gollet</h1>
      </header>
      
      <Tabs defaultValue="foryou" className="w-full">
        <TabsList className="w-full justify-center">
          <TabsTrigger value="foryou">For You</TabsTrigger>
          <TabsTrigger value="reels">Reels</TabsTrigger>
        </TabsList>
        
        <TabsContent value="foryou" className="mt-6">
          <div className="max-w-lg mx-auto px-4 space-y-6">
            {imagesLoading ? (
              <div>Loading...</div>
            ) : (
              images?.map((post) => (
                <ImageCard
                  key={post.id}
                  src={post.image_url}
                  alt={`Post ${post.id}`}
                  caption={post.caption}
                />
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
                <div key={post.id} className="aspect-video rounded-lg overflow-hidden bg-black">
                  <video
                    src={post.video_url}
                    controls
                    className="w-full h-full object-contain"
                  />
                  {post.caption && (
                    <p className="text-sm text-gray-600 mt-2">{post.caption}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <BottomNav />
    </div>
  );
};

export default Index;