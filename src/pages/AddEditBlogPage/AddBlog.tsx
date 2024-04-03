import { useEffect, useState } from "react";
import {
  createBlog,
  createCategory,
  createTag,
  getCategory,
  getTagName,
} from "../../redux/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { addBlogSchema } from "src/schemas";
import ReactQuill from "react-quill";
import TextEditorToolbarOptions from "src/components/TextEditorToolbarOptions";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const AddBlog = () => {
  const dispatch: any = useDispatch();
  const [tag, setTag] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [value, setValue] = useState("");

  const { categoryList, tagList } = useSelector((state: any) => state.blogList);

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tag: [],
    },
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
      setValue("");
    },
  });
  console.log("🚀 ~ onSubmit: ~ category:", values.category);

  const animatedComponents = makeAnimated();
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTagName());
  }, []);

  useEffect(() => {
    setFieldValue("description", value);
  }, [value]);

  const handleTag = async (e: any) => {
    try {
      e.preventDefault();
      dispatch(createTag({ tag: tag }));
      setTag("");
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  const handleCategory = (e: any) => {
    try {
      e.preventDefault();
      dispatch(createCategory({ category: category }));
      setCategory("");
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };

  console.log(values.category);

  const categoryOptions =
    categoryList &&
    categoryList?.flatMap((item: any) => [
      {
        value: item.id,
        label: item.category,
      },
    ]);

  const tagOptions =
    tagList &&
    tagList?.flatMap((item: any) => [
      {
        value: item.id,
        label: item.tag,
      },
    ]);

  return (
    <div className="w-full py-7">
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
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border border-black p-2 w-full rounded-md`}
            // onChange={(e) => setName(e.target.value)}
          />
          {errors.name && touched.name ? (
            <div className="form-error text-red-500">{errors.name}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <div className="text-editor py-4">
            <ReactQuill
              modules={TextEditorToolbarOptions()}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
          <div>
            {/* <textarea
            name="description"
            id="description"
            rows={5}
            // value={description}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`border border-black p-2 w-full`}
            // onChange={(e) => setDescription(e.target.value)}
          ></textarea> 
           {additionalDescriptions.map((description: string, index: number) => (
            <div key={index}>
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
          {errors.description && touched.description ? (
            <div className="form-error text-red-500">{errors.description}</div>
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
          </div> */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="category">Category:</label>
          <Select
            className="min-w-40 max-w-fit"
            components={animatedComponents}
            options={categoryOptions}
            name="category"
            value={values.category}
            onChange={handleChange}
          />

          {/* <select
            name="category"
            id="category"
            // onClick={(e: any) => setCategoryId(e.target.value)}
            onClick={handleChange}
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
          </select> */}
        </div>
        {errors.category && touched.category ? (
          <div className="form-error px-4 text-red-500">{errors.category}</div>
        ) : null}

        <div className="flex items-center gap-4">
          <label htmlFor="tag">Tags:</label>
          <Select
            className="min-w-40 max-w-fit"
            components={animatedComponents}
            options={tagOptions}
            name="tag"
            onChange={handleChange}
            isMulti
          />
          {/* {tagList &&
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
            ))} */}
        </div>
        {errors.tag && touched.tag ? (
          <div className="form-error px-4 text-red-500">{errors.tag}</div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-slate-400 px-4 py-2 w-fit rounded-md hover:bg-slate-400/85 text-white ${
            isSubmitting ? "bg-slate-400/25 cursor-not-allowed" : ""
          }`}
        >
          Add Blog
        </button>
      </form>

      <form action="" onSubmit={handleTag}>
        <div className="py-4 flex flex-col">
          <label htmlFor="addTag">Add Tag: </label>
          <input
            type="text"
            name="addTag"
            value={tag}
            className="border border-black p-2 rounded-md"
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

      <form action="" onSubmit={handleCategory}>
        <div className="py-4 flex flex-col">
          <label htmlFor="addTag">Add Category: </label>
          <input
            type="text"
            name="addTag"
            className="border border-black p-2 rounded-md"
            onChange={(e: any) => setCategory(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-slate-400 px-4 py-2 rounded-md hover:bg-slate-400/85 text-white"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
