import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteblog } from "../redux/actions/blogActions";

const Card = ({
  image,
  tag,
  name,
  description,
  blog_id,
}: {
  image: any;
  tag: any;
  name: any;
  description: any;
  blog_id: any;
}) => {
  const storage_api = import.meta.env.VITE_STORAGE_API;

  const navigate = useNavigate();

  const dispatch = useDispatch<any>();

  const handleDeleteBlog = (id: any) => {
    dispatch(deleteblog({ id }));
  };

  const handleEditBlog = (id: any) => {
    navigate(`edit-blog/${id}`);
    // dispatch();
  };

  return (
    <div>
      <div className="p-2 min-h-96 flex border rounded-md justify-center shadow-md">
        <div className="flex flex-col justify-between gap-4 w-full">
          <Link to={`single-blog/${blog_id}`}>
            <div className="flex flex-col gap-2">
              <div className="image mx-auto w-full ">
                <img
                  src={`${storage_api}/${image}`}
                  alt="image"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>

              <div className="w-full flex flex-col gap-2 min-h-40">
                <span className="text-blue-500">
                  {tag}
                  {/* {item.tags.map((tag: any) => "#" + tag.tag + " ")} */}
                </span>
                <h2 className="font-semibold text-xl">{name.slice(0, 10)}</h2>
                <p>{description.slice(0, 60)}</p>
              </div>
            </div>
          </Link>
          <div className="flex">
            <button
              className="button px-3 py-1 rounded-md bg-slate-400 mr-2 hover:bg-slate-400/85 text-white"
              onClick={() => handleEditBlog(blog_id)}
            >
              Edit
            </button>
            <button
              className="button px-2 rounded-md bg-red-500 mx-2 hover:bg-red-500/85 text-white"
              onClick={() => handleDeleteBlog(blog_id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
