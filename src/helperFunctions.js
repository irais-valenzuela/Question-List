export const generateDisplayObject = (questionArray, userSubmissionArray) => {
  const map = {};

  questionArray.forEach((questionObject) => {
    const { category, name, id } = questionObject;

    if (map.hasOwnProperty(category)) {
      map[category].push({ name, id, category });
    } else {
      map[category] = [];
      map[category].push({ name, id, category });
    }
  });

  // appending status to map holding categories and questions
  userSubmissionArray.forEach((userSubmission) => {
    const { questionId } = userSubmission;
    for (let key in map) {
      for (let i = 0; i < map[key].length; i++) {
        if (map[key][i].id === questionId) {
          map[key][i].status = userSubmission.status;
          break;
        }
      }
    }
  });
  return map;
};

export const findCorrectSubmissions = (
  userSubmissionArray,
  questionArray,
  setCorrectQuestionObject
) => {
  // saving question to category key
  const map = {};

  questionArray.forEach((questionObject) => {
    const { category, id } = questionObject;
    if (map.hasOwnProperty(category)) {
      map[category].push(id);
    } else {
      map[category] = [];
      map[category].push(id);
    }
  });

  const correctSubmissionsMap = {
    HTML: 0,
    CSS: 0,
    JavaScript: 0,
    "DOM Manipulation": 0
  };

  // checking if map that contains all questions match the user's submissions
  // purpose is the calculate the category completed numbers
  userSubmissionArray.forEach((userSubmission) => {
    const { questionId, status } = userSubmission;

    for (let key in map) {
      if (map[key].includes(questionId)) {
        if (status === "CORRECT") {
          if (correctSubmissionsMap.hasOwnProperty(key)) {
            correctSubmissionsMap[key] += 1;
          }
        }
      }
    }
  });

  setCorrectQuestionObject({
    HTML: correctSubmissionsMap.HTML,
    CSS: correctSubmissionsMap.CSS,
    JavaScript: correctSubmissionsMap.JavaScript,
    "DOM Manipulation": correctSubmissionsMap["DOM Manipulation"]
  });
};
