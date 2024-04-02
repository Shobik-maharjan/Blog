import axios from "axios";
import {
  BLOG_REQUEST,
  BLOG_REQUEST_SUCCESS,
  CREATE_BLOG,
  GET_BLOG,
  GET_CATEGORY,
  GET_SINGLE_BLOG,
  GET_TAG,
} from "../constants/blogConstants";
import { toast } from "react-toastify";

const api = import.meta.env.VITE_API;

export const createBlog =
  ({
    name,
    description,
    category_id,
    tagId,
  }: {
    name: any;
    description: any;
    category_id: any;
    tagId: any;
  }) =>
  async (dispatch: any) => {
    try {
      await axios.post(`${api}/create/blog`, {
        name,
        description,
        category_id,
        tag_id: tagId.map((item: any) => item),
      });
      toast.success("Blog added successfully");

      dispatch({
        type: CREATE_BLOG,
        payload: { name, description },
      });
    } catch (e: any) {
      console.log(e.response.data);
    }
  };

export const getBlog = () => async (dispatch: any) => {
  try {
    dispatch({
      type: BLOG_REQUEST,
    });
    const { data } = await axios.get(`${api}/blog`);
    dispatch({
      type: GET_BLOG,
      payload: data,
    });
    dispatch({
      type: BLOG_REQUEST_SUCCESS,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getSingleBlog =
  ({ id }: { id: any }) =>
  async (dispatch: any) => {
    try {
      const res = await axios.get(`${api}/blog/${id}}`);
      dispatch({
        type: GET_SINGLE_BLOG,
        payload: res.data.blogs,
      });
    } catch (e) {
      console.log(e);
    }
  };

export const editSingleBlog =
  ({
    name,
    description,
    category_id,
    tagId,
    id,
    formData,
  }: {
    name: any;
    description: any;
    category_id: any;
    tagId: any;
    id: any;
    formData: any;
  }) =>
  async (dispatch: any) => {
    try {
      await axios.put(`${api}/edit/blog/${id}`, {
        name,
        description,
        category_id,
        tag_id: tagId.map((item: any) => item),
      });
      toast.success("Blog edited successfully");

      if (formData.get("image").name) {
        await axios.post(`${api}/add/image/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      dispatch(getSingleBlog({ id }));
    } catch (e) {
      console.log(e);
    }
  };

export const deleteblog =
  ({ id }: { id: Int32Array }) =>
  async (dispatch: any) => {
    try {
      await axios.delete(`${api}/delete/blog/${id}`);
      dispatch(getBlog());
      toast.success("Blog deleted successfully");
    } catch (e) {
      console.log(e);
    }
  };

export const createTag =
  ({ tag }: { tag: any }) =>
  async () => {
    try {
      await axios.post(`${api}/create/tag`, {
        tag,
      });
      toast.success("Tag added successfully");
      console.log("tag added");
    } catch (e) {
      console.log(e);
    }
  };

export const createCategory =
  ({ category }: { category: any }) =>
  async () => {
    try {
      await axios.post(`${api}/create/category`, {
        category,
      });
      toast.success("Category added successfully");
      console.log("Category added");
    } catch (e) {
      console.log(e);
    }
  };

export const getCategory = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${api}/category`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data.category,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getTagName = () => async (dispatch: any) => {
  try {
    const res = await axios.get(`${api}/tag`);
    dispatch({
      type: GET_TAG,
      payload: res.data.tags,
    });
  } catch (e) {
    console.log(e);
  }
};
