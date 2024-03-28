import axios from "axios";
import { useEffect, useState } from "react";
import {
  createBlog,
  createTag,
  getBlog,
  getCategory,
  getTagName,
} from "../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";

const AddBlog = () => {
  const api = import.meta.env.VITE_API;
  const dispatch: any = useDispatch();
  const [categoryName, setCategoryName] = useState<any>("");
  const [name, setName] = useState<any>("");
  // const [image, setImage] = useState<any>();
  const [description, setDescription] = useState<any>("");
  const [categoryId, setCategoryId] = useState<any>("");
  const [tag, setTag] = useState<any>("");
  const [tagId, setTagId] = useState<any[]>([]);

  const { categoryList, tagList } = useSelector((state: any) => state.blogList);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTagName());
  }, []);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("submit clicked");
      dispatch(
        createBlog({
          name: name,
          description: description,
          category_id: categoryId,
          tagId: tagId,
        })
      );
    } catch (e: any) {
      console.log(e.response.data.message);
    }

    // try {
    //   const formData = new FormData();
    //   formData.append("image", image);

    //   console.log(formData);
    //   const response = await axios.post(`${api}/add/image`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Image uploaded successfully:", response.data);
    // } catch (error) {
    //   console.error("Error uploading image:", error);
    // }
  };

  const handleTag = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(createTag({ tag: tag }));
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  const handleTagChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      // console.log(checked);

      // If checkbox is checked, add the tag ID to the array
      setTagId([...tagId, value]);
    } else {
      // If checkbox is unchecked, remove the tag ID from the array
      setTagId(tagId.filter((id: any) => id !== value));
    }
  };

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit} encType="multipart/formData">
          <div className="p-4 flex items-center">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="border border-black p-2 w-full"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="p-4 flex">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              cols={80}
              rows={5}
              className="border border-black p-2"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <input type="text" name="name" className="border border-black" /> */}
          </div>

          <div className="p-4">
            <label htmlFor="category">Category: </label>
            {categoryList &&
              categoryList.map((item: any) => (
                <select
                  key={item.id}
                  name={item.category}
                  onClick={(e: any) => setCategoryId(e.target.value)}
                  defaultValue={"none"}
                >
                  <option value="" selected>
                    Select category
                  </option>
                  <option
                    value={item.id}
                    key={item.id}
                    className="border border-black"
                  >
                    {item.category}
                  </option>
                </select>
              ))}
          </div>

          <div className="p-4">
            <label htmlFor="tag">Tags: </label>
            {/* <select
              name=""
              id=""
              onClick={(e: any) => setTagId(e.target.value)}
            > */}
            {tagList &&
              tagList.map((item: any) => (
                <div key={item.id}>
                  <label htmlFor={item.tag} className="pr-1">
                    {item.tag}
                  </label>
                  <input
                    type="checkbox"
                    name={item.tag}
                    id={item.id}
                    value={item.id}
                    className="mr-4"
                    onChange={handleTagChange}
                  />
                </div>
                // <option value={item.id}>{item.tag}</option>
              ))}
            {/* </select> */}
          </div>

          <button
            type="submit"
            className="bg-slate-400 px-4 py-2 rounded-md m-4"
          >
            Add Blog
          </button>
        </form>

        <form action="" onSubmit={handleTag}>
          <div className="p-4">
            <label htmlFor="addTag">Add Tag: </label>
            <input
              type="text"
              name="addTag"
              className="border border-black p-2"
              onChange={(e: any) => setTag(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-slate-400 px-4 py-2 rounded-md mx-4"
          >
            Add Tag
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
