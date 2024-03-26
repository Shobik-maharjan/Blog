import axios from "axios";
import { useEffect, useState } from "react";

const AddBlog = () => {
  const [categoryName, setCategoryName] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [tag, setTag] = useState<any>("");
  const [tagId, setTagId] = useState<any[]>([]);
  const [tagName, setTagName] = useState<any>();

  const fetchData = async () => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/category`);
    setCategoryName(data.category);
    const tagName = await axios.get(`http://127.0.0.1:8000/api/tag`);
    setTagName(tagName.data.tags);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("submit clicked");
      console.log(name);
      console.log(description);
      console.log(category);
      console.log(tagId);

      const blogData = await axios.post(
        "http://127.0.0.1:8000/api/create/blog",
        {
          name: name,
          description: description,
          category_id: category,
          tag_id: tagId.map((item: any) => item),
        }
      );
      console.log(blogData.data.message);
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  const handleTag = async (e: any) => {
    try {
      e.preventDefault();
      await axios.post(`http://127.0.0.1:8000/api/create/tag`, {
        tag: tag,
      });
      console.log("tag added");
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  const handleTagChange = (e: any) => {
    const { value, checked } = e.target;
    if (checked) {
      console.log(checked);

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
        <form action="" onSubmit={handleSubmit}>
          <div className="p-4">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className="border border-black p-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="p-4">
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
            <label htmlFor="image">Image: </label>
            <input type="file" name="image" className="border border-black" />
          </div>

          <div className="p-4">
            <label htmlFor="category">Category: </label>
            {categoryName &&
              categoryName.map((item: any) => (
                <select
                  name={item.category}
                  onClick={(e: any) => setCategory(e.target.value)}
                  defaultValue={"none"}
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
