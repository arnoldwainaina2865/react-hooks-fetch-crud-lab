import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });
// function
  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""));
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({
        ...formData,
        answers: newAnswers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: formData.answers,
        correctIndex: parseInt(formData.correctIndex),
      }),
    })
      .then((r) => r.json())
      .then((newQuestion) => onAddQuestion(newQuestion));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        {formData.answers.map((answer, index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name={`answer${index}`}
              value={answer}
              onChange={handleChange}
            />
          </label>
        ))}
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((_, index) => (
              <option key={index} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;