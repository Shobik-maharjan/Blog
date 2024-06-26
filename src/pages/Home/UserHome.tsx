import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../redux/actions/blogActions";
import Loading from "../../components/Loading";
import UserCard from "src/components/UserCard";

const UserHome = () => {
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
        <div className="py-4 w-full">
          <div>
            <h2 className="text-3xl font-semibold p-2 text-center mb-6">
              Blogs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {blog &&
              blog
                .slice()
                .reverse()
                .map((item: any) => (
                  <UserCard
                    image={item.image}
                    tag={item.tags.map((tag: any) => "#" + tag.tag + " ")}
                    name={item.name}
                    description={item.description}
                    blog_id={item.id}
                    key={item.id}
                  />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
