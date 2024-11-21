import { useState } from "react";
import "../pages/Quizzes page/quizzes.css";
import { useEffect } from "react";

const TrueFalse = ({ question, options, index, storeData }) => {
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    storeData(answers.join(","), index);
  }, [selected]);

  return (
    <div id="tf-container">
      <h4>{question}</h4>
      {options.map((item, index) => (
        <>
          <h3>{item}</h3>
          <label>
            <input
              type="radio"
              name={item}
              value="True"
              onChange={() => {
                setSelected(true);
                const newAnswers = [...answers];
                newAnswers[index] = "True";
                setAnswers(newAnswers);
              }}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name={item}
              value="False"
              onChange={() => {
                setSelected(false);
                const newAnswers = [...answers];
                newAnswers[index] = "False";
                setAnswers(newAnswers);
              }}
            />
            False
          </label>
        </>
      ))}
    </div>
  );
};

export default TrueFalse;
