export const GetQuizData = async (amount, category, difficulty) => {
  if (category === "any" && difficulty === "any") {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    return [response, json];
  } else if (difficulty !== "any" && category === "any") {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return [response, json];
  } else if (category !== "any" && difficulty === "any") {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return [response, json];
  } else {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`,
      {
        method: "GET",
      }
    );

    const json = await response.json();
    return [response, json];
  }
};

export const GetNumInDB = async (category, difficulty) => {
  const difficultyName = `total_${difficulty}_question_count`;
  const response = await fetch(
    `https://opentdb.com/api_count.php?category=${category}`,
    {
      method: "GET",
    }
  );

  const json = await response.json();
  const categoryQuestionCount = json.category_question_count;
  const totalQuestionCount = categoryQuestionCount[difficultyName];
  return totalQuestionCount;
};
