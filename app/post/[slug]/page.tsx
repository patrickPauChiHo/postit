"use client";

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddComment from "@/app/components/AddComment";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

//fetch post
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <div>
      <Post
        id={data?.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.Comment}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-lg">
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="fold-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment?.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
