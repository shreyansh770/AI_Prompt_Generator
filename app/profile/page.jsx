"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPost();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete"); // in built

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id != post._id);

        setPosts(filteredPost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      description="Welcome to your personlized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
};

export default MyProfile;
