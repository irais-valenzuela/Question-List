const Question = ({ displayObject, property }) => {
  return (
    <>
      {displayObject[property].map((questionObject) => {
        const { name, id, status } = questionObject;
        return (
          <div className="question" key={id}>
            <div className={`status ${lowercaseStatus(status)}`} />
            <h3>{name}</h3>
          </div>
        );
      })}
    </>
  );
};

const lowercaseStatus = (status) => {
  let lowercased;
  if (
    status === "CORRECT" ||
    status === "INCORRECT" ||
    status === "PARTIALLY_CORRECT"
  ) {
    if (status.includes("_")) {
      const newArr = status.split("");
      const index = newArr.indexOf("_");
      newArr[index] = "-";
      const result = newArr.join("").toLowerCase();
      return result;
    } else {
      lowercased = status.toLowerCase();
      return lowercased;
    }
  } else if (status === undefined) {
    return "unattempted";
  }
};

export default Question;
