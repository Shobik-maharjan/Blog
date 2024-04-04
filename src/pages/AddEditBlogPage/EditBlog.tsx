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
import ReactQuill from "react-quill";
import TextEditorToolbarOptions from "src/components/TextEditorToolbarOptions";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const EditBlog = () => {
  const dispatch: any = useDispatch();

  const [image, setImage] = useState<any>();
  const [tag, setTag] = useState<any>("");

  const blogId = useParams<any>();
  const blog_id = blogId.blog_id;
  const { singleBlog, categoryList, tagList } = useSelector(
    (state: any) => state.blogList
  );

  const formData = new FormData();
  formData.append("image", image);
  const animatedComponents = makeAnimated();
  console.log("🚀 ~ EditBlog ~ tagList:", tagList);

  const {
    values,
    errors,
    setValues,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tag: "",
      image: "",
    },
    validationSchema: addBlogSchema,
    onSubmit: (values) => {
      // const allDescriptions = [description, ...additionalDescriptions];
      // const allDescriptions = [description, ...additionalDescriptions];
      // const allDescriptions = [description, ...additionalDescriptions];
      const { name, description, category, tag } = values;
      const formData: any = new FormData();
      formData.append("image", image);

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
  console.log("🚀 ~ EditBlog ~ values:", values);

  useEffect(() => {
    if (singleBlog) {
      setFieldValue("description", singleBlog.description);
      setValues({
        ...values,
        name: singleBlog.name,
        description: singleBlog.description,
        category: singleBlog.category_id,
        tag: singleBlog.tags.map((tag: any) => tag.id),
      });
    }
  }, [singleBlog]);

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getTagName());
    dispatch(getSingleBlog({ id: blog_id }));
  }, []);

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

  //   const tagIdNumber = parseInt(value, 10);

  //   if (checked) {
  //     // If checkbox is checked, add the tag ID to the array
  //     if (!tagId.includes(tagIdNumber)) {
  //       setTagId([...tagId, tagIdNumber]);
  //     }
  //     // console.log([tagId]);
  //   } else {
  //     // If checkbox is unchecked, remove the tag ID from the array
  //     setTagId(tagId.filter((id: any) => id !== tagIdNumber));
  //   }
  // };

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

  // const handleAddDescription = () => {
  //   setAdditionalDescriptions([...additionalDescriptions, ""]);
  // };
  // const handleRemoveDescription = () => {
  //   const newDesscriptions = [...additionalDescriptions];
  //   newDesscriptions.pop();
  //   setAdditionalDescriptions(newDesscriptions);
  // };

  // const handleAdditionalDescriptionChange = (index: number, value: any) => {
  //   const newDesscriptions = [...additionalDescriptions];
  //   newDesscriptions[index] = value;
  //   setAdditionalDescriptions(newDesscriptions);
  // };

  // const removeAfterComma = (str: any, i: any) => {
  //   const splitStr = str.split(",");
  //   return splitStr[i];
  // };

  return (
    <div className="py-7 w-full">
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
          <ReactQuill
            modules={TextEditorToolbarOptions()}
            theme="snow"
            value={values.description}
            onChange={(content) => setFieldValue("description", content)}
            onBlur={() => handleBlur({ target: { name: "description" } })}
          />
        </div>
        {typeof errors.description === "string" && touched.description ? (
          <div className="form-error px-4 text-red-500">
            {errors.description}
          </div>
        ) : null}

        <div>
          <label htmlFor="image">Image: </label>
          <input
            type="file"
            name="image"
            className="border border-black"
            onChange={(e: any) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="category">Category: </label>

          <Select
            className="min-w-40 max-w-fit"
            components={animatedComponents}
            options={categoryOptions}
            name="category"
            value={categoryOptions?.find(
              (option: any) => option.value === values.category
            )}
            onChange={(selectedCategory: any) =>
              setFieldValue("category", selectedCategory?.value)
            }
          />
          {/* <div>
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
          </div> */}
        </div>
        {typeof errors.category === "string" && touched.category ? (
          <div className="form-error px-4 text-red-500">{errors.category}</div>
        ) : null}

        <div className="flex items-center gap-4">
          <label htmlFor="tag">Tags:</label>
          <Select
            className="min-w-40 max-w-fit"
            components={animatedComponents}
            options={tagOptions}
            name="tag"
            value={tagOptions?.filter((option: any) =>
              values.tag.includes(option.value)
            )}
            onChange={(selectedOptions) =>
              setFieldValue(
                "tag",
                selectedOptions.map((item: any) => item.value)
              )
            }
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
                  id={item.id}
                  value={[item.id]}
                  checked={tagId?.includes(item.id)}
                  className="mr-4"
                  onChange={handleTagChange}
                />
              </div>
            ))} */}
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
