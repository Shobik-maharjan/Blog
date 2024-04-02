import { Link } from "react-router-dom";

const UserCard = ({
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

  return (
    <div>
      <div className="p-2 min-h-80 flex border rounded-md justify-center shadow-md">
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

              <div className="w-full flex flex-col gap-2">
                <span className="text-blue-500">
                  {tag}
                  {/* {item.tags.map((tag: any) => "#" + tag.tag + " ")} */}
                </span>
                <h2 className="font-semibold text-xl">{name.slice(0, 10)}</h2>
                <p>{description.slice(0, 60)}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
