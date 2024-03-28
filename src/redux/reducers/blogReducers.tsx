import {
  CREATE_BLOG,
  GET_BLOG,
  GET_CATEGORY,
  GET_SINGLE_BLOG,
  GET_TAG,
} from "../constants/blogConstants";

const initialData = {
  blogs: [],
};

const blogReducers = (state: any = initialData, action: any) => {
  switch (action.type) {
    case CREATE_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    case GET_BLOG:
      return {
        ...state,
        getBlogs: action.payload,
      };
    case GET_SINGLE_BLOG:
      return {
        ...state,
        singleBlog: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categoryList: action.payload,
      };
    case GET_TAG:
      return {
        ...state,
        tagList: action.payload,
      };
    default:
      return state;
  }
};

export default blogReducers;
