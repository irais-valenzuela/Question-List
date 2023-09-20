import Question from "./Question";

const Category = ({ property, correctQuestionObject, displayObject }) => {
  return (
    <div className="category" key={property}>
      <h2>{`${property} - ${correctQuestionObject[property]} / ${displayObject[property].length}`}</h2>
      <Question displayObject={displayObject} property={property} />
    </div>
  );
};

export default Category;
