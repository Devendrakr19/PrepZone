import React, { useState } from 'react'
import { TextField, } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'; 
import { createGeneratedQuestionsSlice } from '../../redux/slice/QuestionBankSlice'; 
import { useNavigate } from 'react-router-dom';

const GeneratedQuestins = ({setTotalQuestion, textResponse, imgResponse, trade_id}) => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const GeneratedTextData = textResponse?.data?.Questions || [];
    const GeneratedImgData = imgResponse?.Questions || [];
    const createLoading = useSelector((state) => state?.questionBank?.createGeneratedQuestionsLoading);

    const initialQuestions = GeneratedImgData.length > 0 ? GeneratedImgData : GeneratedTextData;
    const [questions, setQuestions] = useState(initialQuestions); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    setTotalQuestion(questions.length); 

    const handleInputChange = (index, field, value) => {
        const updatedQuestions = [...questions];
      
        if (field === "Choices") {
          // Create a copy of the choices array to avoid direct mutation
          const updatedChoices = [...updatedQuestions[index].Choices];
          updatedChoices[value.choiceIndex] = value.newValue;
      
          // Update the question with the new choices array
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            Choices: updatedChoices,
          };
        } else {
          // Update other fields directly
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
          };
        }
      
        setQuestions(updatedQuestions);
      };
      

      const handleSubmit = async () => {
        const formData = {
            trade_id,
            Questions: questions
        }
        // console.log("Submitted Questions:", formData);
        try{
          if(questions?.length > 1){
             await dispatch(createGeneratedQuestionsSlice(formData))
          }
           
           navigate("/questionsbank");
        }
        catch (error){
            console,log(error);
        }
      };

      const handleCancel = () =>{
        window.location.reload();
      }

      const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      };
    
      const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      };

      const currentQuestion = questions[currentQuestionIndex];

    return (
        <>
      {/* {currentQuestion.map((q, index) => ( */}
        <div key={currentQuestionIndex} className="flex gap-[20px] mb-4">
          <div className="w-[100%]">
            <div className="flex items-center gap-[15px]">
              {/* Question */}
              <div className="flex flex-col w-[50%]">
                <label className="text-[18px] font-[600] text-[#172052] roboto">
                 {currentQuestionIndex + 1}. Question
                </label>
                <TextField
                  fullWidth
                  sx={{
                    mt: "8px",
                    "& .MuiInputBase-root": { height: 40 },
                  }}
                  variant="outlined"
                  name="question"
                  value={currentQuestion?.Question}
                  onChange={(e) =>
                    handleInputChange(currentQuestionIndex, "Question", e.target.value)
                  }
                />
              </div>

              {/* Answer */}
              <div className="flex flex-col w-[50%]">
                <label className="text-[18px] font-[600] text-[#1d7e08] roboto">
                  Answer
                </label>
                <TextField
                  fullWidth
                  sx={{
                    mt: "8px",
                    "& .MuiInputBase-root": { height: 40 },
                  }}
                  variant="outlined"
                  name="answer"
                  value={currentQuestion?.Answer}
                  onChange={(e) =>
                    handleInputChange(currentQuestionIndex, "Answer", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Options */}
            <div className="mt-[20px] mb-[10px]">
              <div className="text-[16px] font-[500] text-[#545454] roboto">
                Options
              </div>
              <div className="flex flex-wrap -mx-2">
                {currentQuestion?.Choices?.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="w-[50%] px-2 mt-4">
                    <label className="text-[16px] font-[500] text-[#545454] roboto">
                      {String.fromCharCode(65 + choiceIndex)}{")."}
                    </label>
                    <TextField
                      fullWidth
                      sx={{
                        mt: "8px",
                        "& .MuiInputBase-root": { height: 40 },
                      }}
                      variant="outlined"
                      value={choice}
                      onChange={(e) =>
                        handleInputChange(currentQuestionIndex, "Choices", {
                          choiceIndex,
                          newValue: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      {/* ))} */}

      <div className="flex gap-[20px] mt-[20px]">
        <button
          type="button"
          className="cursor-pointer border-[2px] border-[#172052] px-[20px] py-[5px] text-[16px] text-[#172052] font-[500] rounded manrope"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="cursor-pointer border-[2px] border-[#172052] bg-[#172052] px-[30px] py-[5px] text-[16px] text-[#ffff] font-[500] rounded manrope"
          type="button"
          onClick={handleSubmit}
          disabled={createLoading}
        >
          {createLoading ? "Saving..." : "Save"}
        </button> 
        {questions.length > 1 && currentQuestionIndex > 0 && (
            <button
            className="cursor-pointer border-[2px] border-[#172052] bg-[#172052] px-[30px] py-[5px] text-[16px] text-[#ffff] font-[500] rounded manrope"
            type="button"
            onClick={handlePrevious}
            >
          Previous
        </button> 
        )}
        {questions.length > 1 && currentQuestionIndex < questions.length - 1 && (
        <button
          className="cursor-pointer border-[2px] border-[#172052] px-[20px] py-[5px] text-[16px] text-[#172052] font-[500] rounded manrope"
          type="button"
          onClick={handleNext}
        >
          Next
        </button>
    )}
      </div>
    </>
  );
};
export default GeneratedQuestins