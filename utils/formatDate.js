import createError from "http-errors";
import dayjs from "dayjs";
import "dayjs/locale/th.js";
import buddhistEra from "dayjs/plugin/buddhistEra.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);
dayjs.extend(buddhistEra); // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.

const customDate = {
  // dateLongTH: (date) => {
  //   dayjs.locale("th");
  //   return dayjs(date).format("DD MMMM BBBB");
  // },
  // dateShortTH: (date) => {
  //   dayjs.locale("th");
  //   return dayjs(date).format("DD MMM BB");
  // },
  // dateLongEN: (date) => {
  //   dayjs.locale("en");
  //   return dayjs(date).format("DD MMMM YYYY");
  // },
  // dateShortEN: (date) => {
  //   dayjs.locale("en");
  //   return dayjs(date).format("DD MMM YY");
  // },
  dateFormat: (date, formatStr, locale) => {
    try {
      dayjs.locale(locale);
      const paramDate = date === "now" ? dayjs() : dayjs(date);
      return paramDate.format(formatStr);
    } catch (error) {
      console.log("==== dateFormat ====\n", error);
      throw createError(500, "format date Error");
    }
  },
  isDateValid: (date, formatStr) => {
    try {
      return dayjs(date, formatStr, true).isValid();
    } catch (error) {
      console.log("==== isDateValid ====\n", error);
      throw createError(500, "validate date Error");
    }
  },
};

export default customDate;
