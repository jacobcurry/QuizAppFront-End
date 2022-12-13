export const CheckGoodScore = (score) => {
  let splitScore = score.split("/");
  splitScore = splitScore.map((item) => {
    return parseInt(item);
  });
  let percent = (splitScore[0] / splitScore[1]) * 100;

  return percent;
};

export const compareScoreFeedback = (score) => {
  if (score <= 40) {
    return "Wow, that's bad you need some more practice, take another quiz!";
  } else if (40 < score < 80) {
    return "Pretty good score but, you should keep practicing!";
  } else if (80 <= score <= 90) {
    return "Good job, try to top that!";
  } else {
    return "Great job, thats one of the best scores all day!";
  }
};
