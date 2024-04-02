import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../../redux/actions/blogActions";

const SinglePageBlog = () => {
  const blogId = useParams();
  const dispatch = useDispatch<any>();
  const storage_api = import.meta.env.VITE_STORAGE_API;

  const blog_id = blogId.blog_id;

  const { singleBlog } = useSelector((state: any) => state.blogList);
  console.log("🚀 ~ SinglePageBlog ~ singleBlog:", singleBlog);

  useEffect(() => {
    dispatch(getSingleBlog({ id: blog_id }));
  }, []);

  return (
    <>
      {singleBlog && (
        <div className="article py-7">
          <div className="category">
            <h2 className="font-semibold text-lg px-2 py-1 bg-blue-700 w-fit text-white rounded-md">
              {singleBlog.category.category}
            </h2>
          </div>
          <div className="title py-2">
            <h2 className="font-semibold text-xl">{singleBlog.name}</h2>
          </div>
          <div className="tags">
            <span className="text-blue-600">
              {singleBlog.tags.map((item: any) => " #" + item.tag)}
            </span>
          </div>
          <div className="image my-4">
            <img
              src={`${storage_api}/${singleBlog.image}`}
              alt=""
              className="rounded-md w-8/12 mx-auto"
            />
          </div>
          <div className="desctiprion">
            {singleBlog.description.map((item: any) => (
              <p className="py-1">{item}</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePageBlog;
