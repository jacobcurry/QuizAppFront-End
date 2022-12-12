export const GenerateRandomMultipleChoice = (incorrect, correct) => {
  const randNum = () => {
    return Math.floor(Math.random() * 4);
  };
  return incorrect.splice(randNum, 0, correct);
};
