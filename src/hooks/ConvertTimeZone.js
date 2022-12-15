export const convertTimezone = (utc) => {
  let arr = utc.split("T");
  let date = arr[0];
  let time = arr[1];
  let splitTime = time.split(".");
  let utcTime = splitTime[0];
  let splitUtcTime = utcTime.split(":");
  let hours = splitUtcTime[0];
  let mins = splitUtcTime[1];
  let seconds = splitUtcTime[2];
  if (hours === 4) {
    hours = 23;
  } else if (hours === 3) {
    hours = 22;
  } else if (hours === 2) {
    hours = 21;
  } else if (hours === 1) {
    hours = 21;
  } else if (hours === 0) {
    hours = 20;
  } else {
    hours -= 5;
  }
  let timeOfDay = "";
  if (hours < 12) {
    timeOfDay = "AM";
  } else {
    timeOfDay = "PM";
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let splitDate = date.split("-");
  let year = splitDate[0];
  let month = splitDate[1];
  month = parseInt(month);
  let day = splitDate[2];
  let monthName = "";
  if (month === 1) {
    monthName = "January";
  } else if (month === 2) {
    monthName = "Febuary";
  } else if (month === 3) {
    monthName = "March";
  } else if (month === 4) {
    monthName = "April";
  } else if (month === 5) {
    monthName = "May";
  } else if (month === 6) {
    monthName = "June";
  } else if (month === 7) {
    monthName = "July";
  } else if (month === 8) {
    monthName = "August";
  } else if (month === 9) {
    monthName = "September";
  } else if (month === 10) {
    monthName = "October";
  } else if (month === 11) {
    monthName = "November";
  } else if (month === 12) {
    monthName = "December";
  }

  let correctDate = day.concat(" ", monthName, ", ", year);

  let correctTime = hours.toString().concat(":", mins, " ", timeOfDay);
  return correctTime;
};
export const convertDate = (utc) => {
  let arr = utc.split("T");
  let date = arr[0];
  let time = arr[1];
  let splitTime = time.split(".");
  let utcTime = splitTime[0];
  let splitUtcTime = utcTime.split(":");
  let hours = splitUtcTime[0];
  let mins = splitUtcTime[1];
  let seconds = splitUtcTime[2];
  if (hours === 4) {
    hours = 23;
  } else if (hours === 3) {
    hours = 22;
  } else if (hours === 2) {
    hours = 21;
  } else if (hours === 1) {
    hours = 21;
  } else if (hours === 0) {
    hours = 20;
  } else {
    hours -= 5;
  }
  let timeOfDay = "";
  if (hours < 12) {
    timeOfDay = "AM";
  } else {
    timeOfDay = "PM";
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  let splitDate = date.split("-");
  let year = splitDate[0];
  let month = splitDate[1];
  month = parseInt(month);
  let day = splitDate[2];
  let monthName = "";
  if (month === 1) {
    monthName = "January";
  } else if (month === 2) {
    monthName = "Febuary";
  } else if (month === 3) {
    monthName = "March";
  } else if (month === 4) {
    monthName = "April";
  } else if (month === 5) {
    monthName = "May";
  } else if (month === 6) {
    monthName = "June";
  } else if (month === 7) {
    monthName = "July";
  } else if (month === 8) {
    monthName = "August";
  } else if (month === 9) {
    monthName = "September";
  } else if (month === 10) {
    monthName = "October";
  } else if (month === 11) {
    monthName = "November";
  } else if (month === 12) {
    monthName = "December";
  }

  let correctDate = monthName.concat(" ", day, ", ", year);

  let correctTime = hours.toString().concat(":", mins, " ", timeOfDay);
  return correctDate;
};
