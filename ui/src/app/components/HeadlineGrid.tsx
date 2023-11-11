"use client";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import NewsStory from "./NewsStory";
import Axios from "axios";
import LoadingScreen from "../media/animated/puff.svg";

const HeadlineGrid = (props: any) => {
  const [headlines, setHeadlines] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchStories = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:8080/topStories",
      headers: {
        "content-type": "application/json",
      },
      data: {
        topStoriesUrl: "https://www.bbc.co.uk/news",
      },
    };

    Axios.request(options)
      .then(function (response) {
        setHeadlines(response.data);
        setDataLoaded(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStories();
    console.log(headlines);
  }, []);

  const loadingScreen = () => {
    return (
      <>
        <LoadingScreen></LoadingScreen>
      </>
    );
  };

  const storyGrid = () => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {headlines.map((headline) => {
              return headline + "\n";
            })}
          </Grid>
        </Grid>
      </>
    );
  };

  return dataLoaded ? storyGrid : loadingScreen;
};

export default HeadlineGrid;
