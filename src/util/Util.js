import moment from "moment-timezone";
import config from "../config/config.json";
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertAndDisplayTZ(utcDate) {
  return moment.utc(utcDate).tz(config.timeZone).format("D-M-Y");
}

export function convertToWeekDayNames(utcDate) {
  return moment.utc(utcDate).tz(config.timeZone).format("ddd");
}

export function attendanceInputDate(utcDate) {
  return moment.utc(utcDate).tz(config.timeZone).format("YYYY-MM-DD");
}

export function getDatesByMonth(month) {
  if (!months.includes(month)) return undefined;

  const monthIndex = months.indexOf(month);
  const year = new Date().getFullYear();

  // Create moment objects in the 'Asia/Rangoon' timezone
  const startDate = moment.tz([year, monthIndex], config.timeZone);
  const endDate = startDate.clone().endOf("month");

  // Convert to ISO string format
  return { $gte: startDate.toISOString(), $lte: endDate.toISOString() };
}

export const dateForPayload = function (date) {
  return moment.utc(date);
};

export const dateForInput = function (date) {
  return moment.utc(date).tz(config.timeZone).format("YYYY-MM-DD");
};

export const dateForDisplay = function (date) {
  return moment.utc(date).tz(config.timeZone).format("D-M-Y hh:mm");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};



export const getCurrentUserId = () => {
  let currentUser = JSON.parse(localStorage.getItem("user"));

  if (currentUser.roles.includes("instructor")) {
    return currentUser.instructor._id;
  } else if (currentUser.roles.includes("student")) {
    return currentUser.student._id;
  }

  // if (currentUser.roles.includes("student")) {
  //   return currentUser.student._id;
  // } else if (currentUser.roles.includes("instructor")) {
  //   return currentUser.instructor._id;
  // }
};
