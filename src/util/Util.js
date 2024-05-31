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

export const dateForDisplay = function (date, payload) {
  return moment.utc(date).tz(config.timeZone).format(payload?.format ?? "D-M-Y hh:mm");
};

export function convertTo12Hour(timeString) {
  // Check for valid time format (HH:MM)
  const timeRegex = /^([0-1][\d]|2[0-3]):([0-5][\d])$/;
  const match = timeString.match(timeRegex);
  if (!match) {
    return "Invalid time format";
  }

  let hours = parseInt(match[1]);
  const minutes = match[2];
  let amPm = "AM";

  // Convert to 12-hour format and set AM/PM
  if (hours >= 12) {
    amPm = "PM";
    hours = hours % 12 || 12; // Handle noon (12 PM)
  } else if (hours === 0) {
    hours = 12; // Handle midnight (12 AM)
  }

  return `${hours}:${minutes} ${amPm}`;
}

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
