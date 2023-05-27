"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [userSpecificPost, setUserSpecificPost] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/users/${params?.id}/posts`);
      const data = await res.json();
      setUserSpecificPost(data);
    };

    if (params?.id) fetchPost();
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName} personlized profile page. Explore all the wonder full prompt.`}
      data={userSpecificPost}
    ></Profile>
  );
};

export default MyProfile;
