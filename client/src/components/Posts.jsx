import React, { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Make the request with credentials (cookies) automatically included
        const response = await axios.get("http://localhost:5000/api/posts", {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.response || error.message);
      }
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
