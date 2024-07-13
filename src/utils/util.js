export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

export const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const celsiusToFarenheit = (temp) => {
  const dayTemp = ((9 / 5) * temp.day + 32).toFixed(1);
  const minTemp = ((9 / 5) * temp.min + 32).toFixed(1);
  const maxTemp = ((9 / 5) * temp.max + 32).toFixed(1);
  const morningTemp = ((9 / 5) * temp.morn + 32).toFixed(1);
  const nightTemp = ((9 / 5) * temp.night + 32).toFixed(1);
  const eveningTemp = ((9 / 5) * temp.eve + 32).toFixed(1);

  const data = {
    day: +dayTemp,
    min: +minTemp,
    max: +maxTemp,
    morn: +morningTemp,
    eve: +eveningTemp,
    night: +nightTemp,
  };

  return data;
};

export const fahrenheitToCelsius = (temp) => {
  const dayTemp = ((temp.day - 32) * (5 / 9)).toFixed(1);
  const minTemp = ((temp.min - 32) * (5 / 9)).toFixed(1);
  const maxTemp = ((temp.max - 32) * (5 / 9)).toFixed(1);
  const morningTemp = ((temp.morn - 32) * (5 / 9)).toFixed(1);
  const nightTemp = ((temp.night - 32) * (5 / 9)).toFixed(1);
  const eveningTemp = ((temp.eve - 32) * (5 / 9)).toFixed(1);

  const data = {
    day: +dayTemp,
    min: +minTemp,
    max: +maxTemp,
    morn: +morningTemp,
    eve: +eveningTemp,
    night: +nightTemp,
  };

  return data;
};

export const TimeFormatter = (dt) => {
  const Dt = new Date(dt * 1000);
  const date = Dt.getDate();
  const year = Dt.getFullYear();
  const month = months[Dt.getMonth()];

  return `${date} ${month},${year}`;
};

export const cityName = (city) => {
  if (city.split(" ").length === 1) {
    return city.slice(0, 1).toUpperCase() + city.substring(1).toLowerCase();
  } else {
    return city
      .split(" ")
      .map((ct) => ct.charAt(0).toUpperCase() + ct.toLowerCase().substring(1))
      .join(" ");
  }
};

export const rotateArray = (pos) => {
  const len = daysOfWeek.length;
  const rotateArray = new Array(len);
  for (let i = 0; i < len; i++) {
    const newIndex = (i + pos) % len;
    rotateArray[i] = { name: daysOfWeek[newIndex], id: i + 1 };
  }
  return rotateArray;
};
