import React from "react";

const extractTime = (time) => {
  const date = new Date(time);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

export default extractTime;

function padZero(number) {
  return number.toString().padStart(2, "0");
}
