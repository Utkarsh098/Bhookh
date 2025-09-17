import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/reels.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  // Autoplay behavior is handled inside ReelFeed

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food", { withCredentials: true })
      .then((response) => {
        console.log(response.data.foodItems);

        setVideos(response.data.foodItems);
      })
      .catch(() => {
        /* noop: optionally handle error */
      });
  }, []);

  return (
    <>
      <ReelFeed videos={videos} />
    </>
  );
};

export default Home;
