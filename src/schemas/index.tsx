import * as Yup from "yup";

export const addBlogSchema: any = Yup.object({
  name: Yup.string().required("Please enter blog name"),
  description: Yup.string().required("Please enter blog description"),
  category: Yup.string().required("Please select category"),
  tag: Yup.array()
    .min(1, "Please select at least one tag")
    .required("Please select tags"),
});
