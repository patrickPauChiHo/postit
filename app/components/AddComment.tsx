"use Client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  title: string;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  let commentToastId: string;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (data: Comment) =>
      await axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        toast.success("Added your comment!", { id: commentToastId });
        queryClient.invalidateQueries(["detail-post"]);
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);

    mutate({ title, postId: id });
  };

  return (
    <form onSubmit={submitComment} className=" my-8 ">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          type="submit"
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
        >
          Add comment 🚀{" "}
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  );
}
