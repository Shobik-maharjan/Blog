import { useEffect, useState } from "react";
import {
  createBlog,
  createTag,
  getCategory,
  getTagName,
} from "../../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addBlogSchema } from "src/schemas";

const initialValues = {
  name: "",
  description: "",
  category: "",
  tag: [],
};

const AddBlog = () => {
  const dispatch: any = useDispatch();
  // const [name, setName] = useState<any>("");
  // const [description, setDescription] = useState<any>("");
  // const [categoryId, setCategoryId] = useState<any>("");
  // const [tagId, setTagId] = useState<any[]>([]);
  // const [error, setError] = useState<any>("");
  const [tag, setTag] = useState<any>("");

  const { categoryList, tagList } = useSelector((state: any) => state.blogList);

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: addBlogSchema,
    onSubmit: async (values, actions) => {
      const { name, description, category, tag } = values;

      dispatch(
        createBlog({
          name: name,
          description: description,
          category_id: category,
          tagId: tag,
        })
      );
      actions.resetForm();
    },
  });

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTagName());
  }, []);

  // const handleSubmit = async (e: any) => {
  //   try {
  //     e.preventDefault();
  //     console.log("submit clicked");

  //     if (name && description && categoryId && tagId) {
  //       setError("");
  //       dispatch(
  //         createBlog({
  //           name: name,
  //           description: description,
  //           category_id: categoryId,
  //           tagId: tagId,
  //         })
  //       );
  //     } else {
  //       setError("All field are required");
  //     }
  //   } catch (e: any) {
  //     console.log(e.response.data.message);
  //   }
  //   console.log(error);
  //   // try {
  //   //   const formData = new FormData();
  //   //   formData.append("image", image);

  //   //   console.log(formData);
  //   //   const response = await axios.post(`${api}/add/image`, formData, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data",
  //   //     },
  //   //   });
  //   //   console.log("Image uploaded successfully:", response.data);
  //   // } catch (error) {
  //   //   console.error("Error uploading image:", error);
  //   // }
  // };

  const handleTag = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(createTag({ tag: tag }));
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  // const handleTagChange = (e: any) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     // If checkbox is checked, add the tag ID to the array
  //     setTagId([...tagId, value]);
  //   } else {
  //     // If checkbox is unchecked, remove the tag ID from the array
  //     setTagId(tagId.filter((id: any) => id !== value));
  //   }
  // };

  return (
    <>
      <div className="w-full">
        <form action="" onSubmit={handleSubmit} encType="multipart/formData">
          <div className="p-4">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 w-full ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              // onChange={(e) => setName(e.target.value)}
            />
            {errors.name && touched.name ? (
              <div className="form-error text-red-500">{errors.name}</div>
            ) : null}
          </div>

          <div className="p-4">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              id="description"
              rows={5}
              // value={description}
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`border p-2 w-full ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              // onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && touched.description ? (
              <div className="form-error text-red-500">
                {errors.description}
              </div>
            ) : null}
          </div>

          <div className="p-4 flex">
            <label htmlFor="category">Category: </label>

            <select
              name="category"
              id="category"
              // onClick={(e: any) => setCategoryId(e.target.value)}
              onClick={handleChange}
            >
              <option value="">Select category</option>
              {categoryList &&
                categoryList.map((item: any) => (
                  <>
                    <option
                      value={item.id}
                      className="border border-black"
                      key={item.id}
                    >
                      {item.category}
                    </option>
                  </>
                ))}
            </select>
          </div>
          {errors.category && touched.category ? (
            <div className="form-error px-4 text-red-500">
              {errors.category}
            </div>
          ) : null}

          <div className="p-4 flex">
            <label htmlFor="tag" className="pr-2">
              Tags:
            </label>
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
                    name="tag"
                    id="tag"
                    value={item.id}
                    className="mr-4"
                    onChange={handleChange}
                  />
                </div>
                // <option value={item.id}>{item.tag}</option>
              ))}
            {/* </select> */}
          </div>
          {errors.tag && touched.tag ? (
            <div className="form-error px-4 text-red-500">{errors.tag}</div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-slate-400 px-4 py-2 rounded-md m-4 ${
              isSubmitting ? "bg-slate-400/25 cursor-not-allowed" : ""
            }`}
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
