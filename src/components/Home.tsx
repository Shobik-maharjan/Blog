import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteblog, getBlog } from "../redux/actions/blogActions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const storage_api = import.meta.env.VITE_STORAGE_API;

  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const { getBlogs } = useSelector((state: any) => state.blogList);
  const blog = getBlogs?.blogs;
  console.log(blog);

  const handleDeleteBlog = (id: any) => {
    dispatch(deleteblog({ id }));
  };

  const handleEditBlog = (id: any) => {
    navigate(`/edit-blog/${id}`);
    // dispatch();
  };

  useEffect(() => {
    dispatch(getBlog());
  }, []);

  return (
    <>
      <div className="p-4">
        <div>
          <h2>Blogs</h2>
        </div>
        <div>
          {blog &&
            blog.map((item: any) => (
              <>
                <div className="px-4 py-2 border-b border-black my-4">
                  <div className="flex items-center">
                    <div>
                      <h2 className="font-semibold text-xl">{item.name}</h2>
                      <p>{item.description.slice(0, 150)}</p>
                    </div>

                    <div className="image">
                      <img
                        src={`${storage_api}/${item.image}`}
                        alt="image"
                        className="max-w-40"
                      />
                    </div>
                    <div className="flex">
                      <button
                        className="button px-4 py-2 rounded-md bg-green-500 mx-2"
                        onClick={() => handleEditBlog(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="button p-2  rounded-md bg-red-500 mx-2"
                        onClick={() => handleDeleteBlog(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
