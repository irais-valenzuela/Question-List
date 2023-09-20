import React, { useEffect, useState } from "react";
import Category from "./Category";
import {
  generateDisplayObject,
  findCorrectSubmissions
} from "./helperFunctions.js";

const QUESTIONS_API_BASE_URL = "https://api.frontendexpert.io/api/fe/questions";
const SUBMISSIONS_API_BASE_URL =
  "https://api.frontendexpert.io/api/fe/submissions";

export default function QuestionList() {
  const [questionArray, setQuestionArray] = useState([]);
  const [userSubmissionArray, setUserSubmissionArray] = useState([]);
  const [displayObject, setDisplayObject] = useState({});
  const [correctQuestionObject, setCorrectQuestionObject] = useState({
    HTML: 0,
    CSS: 0,
    JavaScript: 0,
    "DOM Manipulation": 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(QUESTIONS_API_BASE_URL);
        const data1 = await response1.json();
        setQuestionArray(data1);

        const response2 = await fetch(SUBMISSIONS_API_BASE_URL);
        const data2 = await response2.json();
        setUserSubmissionArray(data2);
      } catch (error) {
        console.error("Something went wrong. Check logs", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDisplayObject(generateDisplayObject(questionArray, userSubmissionArray));
    findCorrectSubmissions(
      userSubmissionArray,
      questionArray,
      setCorrectQuestionObject
    );
  }, [questionArray, userSubmissionArray]);

  return (
    <>
      {Object.keys(displayObject).length
        ? Object.keys(displayObject).map((property) => (
            <Category
              property={property}
              correctQuestionObject={correctQuestionObject}
              displayObject={displayObject}
            />
          ))
        : "Loading..."}
    </>
  );
}
