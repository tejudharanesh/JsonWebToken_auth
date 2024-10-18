import React, { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/posts", {
        headers: { "auth-token": token },
      });
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Protected Posts</h2>
      {posts}
    </div>
  );
}

export default Posts;
