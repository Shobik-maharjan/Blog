import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../redux/actions/blogActions";
// import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

const Home = () => {
  // const storage_api = import.meta.env.VITE_STORAGE_API;

  // const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const { getBlogs, loading } = useSelector((state: any) => state.blogList);
  const blog = getBlogs?.blogs;

  useEffect(() => {
    dispatch(getBlog());
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4">
          <div>
            <h2 className="text-3xl font-semibold p-2 text-center mb-6">
              Blogs
            </h2>
          </div>
          <div className="flex">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-2">
              {blog &&
                blog.map((item: any) => (
                  <Card
                    image={item.image}
                    tag={item.tags.map((tag: any) => "#" + tag.tag + " ")}
                    name={item.name}
                    description={item.description}
                    blog_id={item.id}
                    key={item.id}
                  />
                ))}

              {/* <> */}
              {/* <div className="p-2 min-h-96 flex border rounded-md justify-center shadow-md">
                    <div className="flex flex-col justify-between gap-4 w-full">
                      <Link to={`single-blog/${item.id}`}>
                        <div className="flex flex-col gap-2">
                          <div className="image mx-auto w-full ">
                            <img
                              src={`${storage_api}/${item.image}`}
                              alt="image"
                              className="w-full h-40 object-cover rounded-md"
                            />
                          </div>

                          <div className="w-full flex flex-col gap-2 min-h-40">
                            <span className="text-blue-500">
                              {item.tags.map((tag: any) => "#" + tag.tag + " ")}
                            </span>
                            <h2 className="font-semibold text-xl">
                              {item.name.slice(0, 25)}
                            </h2>
                            <p>{item.description.slice(0, 50)}</p>
                          </div>
                        </div>
                      </Link>
                      <div className="flex">
                        <button
                          className="button px-3 py-1 rounded-md bg-green-500 mr-2"
                          onClick={() => handleEditBlog(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="button px-2 rounded-md bg-red-500 mx-2"
                          onClick={() => handleDeleteBlog(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div> */}
              {/* </> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
