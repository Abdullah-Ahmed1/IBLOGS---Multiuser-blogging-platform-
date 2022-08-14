import Blog from "./Blog";
const Blogs = ( { blogs,handleDelete} ) => {
  return (
    <>
      {blogs.map((blog) => {
        return <Blog blog={blog}  handleDelete={handleDelete}  key={blog._id}   />;
      })}
    </>
  );
};
export default Blogs;
