import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3100/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data));
  }, []);
  return (
    <div>
        {blogs && Array.isArray(blogs.blogs) && blogs.blogs.map((blog, index) => (
   <Blog
      key={index}
      id={blog._id}
      title={blog.title}
      description={blog.description}
      imageURL={blog.image}
      userName={blog.user.name}
   />
))}
    </div>
  );
};

export default Blogs;