export const GenerateRandomMultipleChoice = (incorrect, correct) => {
  const randNum = () => {
    return Math.floor(Math.random() * 4) + 1;
  };
  const arr = incorrect;
  arr.splice(randNum(), 0, correct);
  const arr1 = incorrect.filter((element, index) => {
    return incorrect.indexOf(element) === index;
  });
  return arr1;
};
