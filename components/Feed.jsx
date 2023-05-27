"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [filterPost, setFilterPost] = useState([]);
  const [posts, setPost] = useState([]);

  const postFilter = (value) => {
    const regex = new RegExp(value, "i");
    let newPost = posts.filter((post) => {
      if (
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
      )
        return post;
    });

    return newPost;
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);

    let searchPost = postFilter(e.target.value);
    setFilterPost(searchPost);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    let searchPost = postFilter(tag);
    setFilterPost(searchPost);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={filterPost}
          handleTagClick={() => {}}
        ></PromptCardList>
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        ></PromptCardList>
      )}
    </section>
  );
};

export default Feed;
