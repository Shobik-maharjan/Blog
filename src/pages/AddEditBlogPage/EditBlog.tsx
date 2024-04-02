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
  const [description, setDescription] = useState<any>([]);
  const [category, setCategory] = useState<any>("");
  const [tag, setTag] = useState<any>("");
  const [tagId, setTagId] = useState<any[]>([]);
  const [additionalDescriptions, setAdditionalDescriptions]: any = useState([]);

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

  console.log(description);

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

      const allDescriptions = [description, ...additionalDescriptions];

      dispatch(
        editSingleBlog({
          name: name,
          description: allDescriptions,
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

  const handleAddDescription = () => {
    setAdditionalDescriptions([...additionalDescriptions, ""]);
  };
  const handleRemoveDescription = () => {
    const newDesscriptions = [...additionalDescriptions];
    newDesscriptions.pop();
    setAdditionalDescriptions(newDesscriptions);
  };

  const handleAdditionalDescriptionChange = (index: number, value: any) => {
    const newDesscriptions = [...additionalDescriptions];
    newDesscriptions[index] = value;
    setAdditionalDescriptions(newDesscriptions);
  };

  const removeAfterComma = (str: any, i: any) => {
    const splitStr = str.split(",");
    return splitStr[i];
  };

  return (
    <div className="py-7">
      <form
        action=""
        onSubmit={handleSubmit}
        encType="multipart/formData"
        className="flex flex-col gap-6"
      >
        <div>
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

        <div>
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
          {additionalDescriptions.map((description: string, index: number) => (
            <div>
              <label htmlFor="additionalDescription">
                Additional Description:
              </label>
              <textarea
                name={`description`}
                id={`additionalDescription${index + 1}`}
                rows={5}
                value={description}
                onChange={(e) =>
                  handleAdditionalDescriptionChange(index, e.target.value)
                }
                onBlur={handleBlur}
                className={`border border-black p-2 w-full`}
              ></textarea>
            </div>
          ))}
        </div>
        {typeof errors.description === "string" && touched.description ? (
          <div className="form-error px-4 text-red-500">
            {errors.description}
          </div>
        ) : null}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAddDescription}
            className="bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-400/85 text-white"
          >
            Add Description
          </button>
          {additionalDescriptions.length > 0 ? (
            <button
              type="button"
              className="bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-400/85 text-white"
              onClick={handleRemoveDescription}
            >
              Remove Description
            </button>
          ) : (
            ""
          )}
        </div>

        <div>
          <label htmlFor="image">Image: </label>
          <input
            type="file"
            name="image"
            className="border border-black"
            onChange={(e: any) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex">
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
        {typeof errors.category === "string" && touched.category ? (
          <div className="form-error px-4 text-red-500">{errors.category}</div>
        ) : null}

        <div className="flex">
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
        {typeof errors.tag === "string" && touched.tag ? (
          <div className="form-error px-4 text-red-500">{errors.tag}</div>
        ) : null}

        <button
          type="submit"
          className="bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-400/85 text-white w-fit"
        >
          Edit Blog
        </button>
      </form>

      <form action="" onSubmit={handleTag}>
        <div className="py-4 flex flex-col">
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
          className="bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-400/85 text-white"
        >
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
