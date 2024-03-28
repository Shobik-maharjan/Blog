import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../redux/actions/blogActions";

const SinglePageBlog = () => {
  const blogId = useParams();
  const dispatch = useDispatch<any>();
  const storage_api = import.meta.env.VITE_STORAGE_API;

  const blog_id = blogId.blog_id;
  console.log(blogId);

  const { singleBlog } = useSelector((state: any) => state.blogList);
  console.log(singleBlog);

  useEffect(() => {
    dispatch(getSingleBlog({ id: blog_id }));
  }, []);

  return (
    <>
      <div>
        {singleBlog && (
          <div className="article w-8/12 mx-auto">
            <div>
              <div className="title text-center">
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
                  className=""
                />
              </div>
              <div className="desctiprion text-justify">
                <p>{singleBlog.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePageBlog;
