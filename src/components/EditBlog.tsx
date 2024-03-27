import axios from "axios";
import { useEffect, useState } from "react";
import {
  createTag,
  editSingleBlog,
  getSingleBlog,
} from "../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const api = import.meta.env.VITE_API;
  const dispatch: any = useDispatch();

  const [categoryName, setCategoryName] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [tag, setTag] = useState<any>("");
  const [tagId, setTagId] = useState<any[]>([]);
  const [tagName, setTagName] = useState<any>();

  const { singleBlog } = useSelector((state: any) => state.blogList);
  //   console.log(singleBlog);

  const fetchData = async () => {
    const { data } = await axios.get(`${api}/category`);
    setCategoryName(data.category);
    const tagName = await axios.get(`${api}/tag`);
    setTagName(tagName.data.tags);
  };

  const blogId = useParams<any>();
  const blog_id = blogId.blog_id;

  useEffect(() => {
    if (singleBlog) {
      setName(singleBlog.name);
      setDescription(singleBlog.description);
      setCategory(singleBlog.category_id);
      setImage(singleBlog.image);
      setTagId(singleBlog.tags.map((tag: any) => tag.id));
    }
  }, [singleBlog]);

  useEffect(() => {
    dispatch(getSingleBlog({ id: blog_id }));
  }, []);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("submit clicked");
      const formData = new FormData();
      formData.append("image", image);
      dispatch(
        editSingleBlog({
          name: name,
          description: description,
          category_id: category,
          tagId: tagId,
          id: blog_id,
          formData: formData,
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
    console.log("Value:", value);
    console.log("Checked:", checked);
    if (checked) {
      // If checkbox is checked, add the tag ID to the array
      setTagId([...tagId, value]);
    } else {
      // If checkbox is unchecked, remove the tag ID from the array
      setTagId(tagId.filter((id: any) => id !== value));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit} encType="multipart/formData">
          <div className="p-4 flex items-center">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={name}
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
              value={description}
              className="border border-black p-2"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {/* <input type="text" name="name" className="border border-black" /> */}
          </div>

          <div className="p-4">
            <label htmlFor="image">Image: </label>
            <input
              type="file"
              name="image"
              className="border border-black"
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </div>

          <div className="p-4">
            <label htmlFor="category">Category: </label>
            {categoryName &&
              categoryName.map((item: any) => (
                <select
                  name={item.category}
                  onClick={(e: any) => setCategory(e.target.value)}
                  //   defaultValue={singleBlog?.category}
                  value={singleBlog?.category_id}
                >
                  <option value="" selected>
                    Select category
                  </option>
                  <option value={item.id} className="border border-black">
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
            {tagName &&
              tagName.map((item: any) => (
                <>
                  <label htmlFor={item.tag} className="pr-1">
                    {item.tag}
                  </label>
                  <input
                    type="checkbox"
                    name={item.tag}
                    id={item.id}
                    value={item.id}
                    // checked={tagId.includes(item.id)}
                    className="mr-4"
                    onChange={handleTagChange}
                  />
                </>
                // <option value={item.id}>{item.tag}</option>
              ))}
            {/* </select> */}
          </div>

          <button
            type="submit"
            className="bg-slate-400 px-4 py-2 rounded-md m-4"
          >
            Edit Blog
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

export default EditBlog;
