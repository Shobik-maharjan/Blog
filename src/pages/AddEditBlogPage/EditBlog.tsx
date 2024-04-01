import { useEffect, useState } from "react";
import {
  createTag,
  editSingleBlog,
  getCategory,
  getSingleBlog,
  getTagName,
} from "../../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { addBlogSchema } from "src/schemas";

const EditBlog = () => {
  const dispatch: any = useDispatch();

  const [prevName, setName] = useState<any>("");
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [tag, setTag] = useState<any>("");
  const [tagId, setTagId] = useState<any[]>([]);
  // const [prevTagId, setPrevTagId] = useState<any>();

  const blogId = useParams<any>();
  const blog_id = blogId.blog_id;
  const { singleBlog, categoryList, tagList } = useSelector(
    (state: any) => state.blogList
  );
  const formData = new FormData();
  formData.append("image", image);

  const initialValues = {
    name: prevName,
    description: description,
    category: category,
    tag: tagId,
    image: formData,
  };

  const {
    values,
    errors,
    setValues,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: addBlogSchema,
    onSubmit: (values) => {
      const { name, description, category, tag } = values;
      const formData: any = new FormData();
      formData.append("image", image);

      console.log("clicked");

      dispatch(
        editSingleBlog({
          name: name,
          description: description,
          category_id: category,
          tagId: tag,
          id: blog_id,
          formData: formData,
        })
      );
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      name: prevName,
      description: description,
      category: category,
      tag: tagId,
    });
  }, [prevName, description, category, tagId]);

  useEffect(() => {
    if (singleBlog) {
      setName(singleBlog.name);
      setDescription(singleBlog.description);
      setCategory(singleBlog.category_id);
      // setImage(singleBlog.image);
      // setPrevTagId();
      setTagId(singleBlog.tags.map((tag: any) => tag.id));
    }
  }, [singleBlog]);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTagName());
    dispatch(getSingleBlog({ id: blog_id }));
  }, []);

  // const handleSubmit = async (e: any) => {
  //   try {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     formData.append("image", image);

  //     dispatch(
  //       editSingleBlog({
  //         name: name,
  //         description: description,
  //         category_id: category,
  //         tagId: tagId,
  //         id: blog_id,
  //         formData: formData,
  //       })
  //     );
  //   } catch (e: any) {
  //     console.log(e.response.data.message);
  //   }
  // };

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

    const tagIdNumber = parseInt(value, 10);

    if (checked) {
      // If checkbox is checked, add the tag ID to the array
      if (!tagId.includes(tagIdNumber)) {
        setTagId([...tagId, tagIdNumber]);
      }
      // console.log([tagId]);
    } else {
      // If checkbox is unchecked, remove the tag ID from the array
      setTagId(tagId.filter((id: any) => id !== tagIdNumber));
    }
  };

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit} encType="multipart/formData">
          <div className="p-4">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              className="border border-black p-2 w-full"
              // onChange={(e) => setName(e.target.value)}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {typeof errors.name === "string" && touched.name ? (
            <div className="form-error px-4 text-red-500">{errors.name}</div>
          ) : null}

          <div className="p-4">
            <label htmlFor="description">Description: </label>
            <textarea
              name="description"
              id="description"
              cols={80}
              rows={5}
              value={values.description}
              className="border border-black p-2 w-full"
              // onChange={(e) => setDescription(e.target.value)}
              onBlur={handleBlur}
              onChange={handleChange}
            ></textarea>
          </div>
          {typeof errors.description === "string" && touched.description ? (
            <div className="form-error px-4 text-red-500">
              {errors.description}
            </div>
          ) : null}

          <div className="p-4">
            <label htmlFor="image">Image: </label>
            <input
              type="file"
              name="image"
              className="border border-black"
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </div>

          <div className="p-4 flex">
            <label htmlFor="category">Category: </label>

            <div>
              <select
                onChange={(e: any) => setCategory(e.target.value)}
                value={category}
                name="category"
                id="category"
              >
                <option value="">Select category</option>
                {categoryList &&
                  categoryList.map((item: any) => (
                    <option
                      value={item.id}
                      className="border border-black"
                      key={item.id}
                    >
                      {item.category}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {errors.category && touched.category ? (
            <div className="form-error px-4 text-red-500">
              {errors.category}
            </div>
          ) : null}

          <div className="p-4 flex">
            <label htmlFor="tag" className="pr-2">
              Tags:{" "}
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
                    id={item.id}
                    value={[item.id]}
                    checked={tagId?.includes(item.id)}
                    className="mr-4"
                    onChange={handleTagChange}
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
              value={tag}
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
