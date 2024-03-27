import {
  CREATE_BLOG,
  GET_BLOG,
  GET_SINGLE_BLOG,
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
    default:
      return state;
  }
};

export default blogReducers;
