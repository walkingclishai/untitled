import "./quizzes.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MultipleChoice from "../../components/multiplechoice";
import TrueFalse from "../../components/true.false";
import ShortAnswer from "../../components/shortanswer";
import FillInTheBlank from "../../components/fillinblanks";
import Matching from "../../components/matching";
import Essay from "../../components/essay";

function Quizzes() {
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();
  const { title } = useParams();
  const { chapters } = useParams();

  const fetchQuestions = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/questions`, {
        id,
      });

      setQuestions(response.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <div id="title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fed668"
            d="M14 15q.425 0 .738-.312t.312-.738t-.312-.737T14 12.9t-.737.313t-.313.737t.313.738T14 15m0-3.2q.275 0 .513-.2t.287-.525q.05-.3.212-.55t.588-.675q.75-.75 1-1.213t.25-1.087q0-1.125-.788-1.838T14 5q-.825 0-1.5.375T11.425 6.45q-.15.25-.025.525t.425.4q.275.125.538.025t.437-.35q.225-.325.525-.487T14 6.4q.6 0 .975.338t.375.912q0 .35-.2.663t-.7.787q-.725.625-.925.963t-.25.987q-.025.3.188.525T14 11.8M8 18q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V7q0-.425.288-.712T3 6t.713.288T4 7v13h13q.425 0 .713.288T18 21t-.288.713T17 22zM8 4v12z"
          />
        </svg>
        <h1>{title}: </h1>
        <h1> chapters: {chapters}</h1>
      </div>
      <div id="quiz-container">
        {questions.map((item) => (
          <>
            {item.type == "mc" && (
              <MultipleChoice question={item.question} options={item.choices} />
            )}
            {item.type == "t-f" && (
              <TrueFalse question={item.question} options={item.choices} />
            )}
            {item.type == "s-a" && (
              <ShortAnswer question={item.question} options={item.choices} />
            )}
            {item.type == "blanks" && (
              <FillInTheBlank question={item.question} options={item.choices} />
            )}
            {item.type == "matching" && <Matching options={item.choices} />}
            {item.type == "essay" && (
              <Essay question={item.question} options={item.choices} />
            )}
          </>
        ))}
      </div>
    </>
  );
}

export default Quizzes;
