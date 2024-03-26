import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<any>("");
  const fetchData = async () => {
    const getData = await axios.get(`http://127.0.0.1:8000/api/blog`);
    const data = getData.data.blogs;
    // const name = data.map((item: any) => item.name);
    setData(data);
    // console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(data);

  return (
    <>
      <div>{data && data.map((item: any) => item.name + " ")}</div>
    </>
  );
};

export default Home;
