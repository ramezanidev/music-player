import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export const useTimeFormat = (timeStamp: number, format: string = "mm:ss") => {
  return dayjs.utc(timeStamp * 1000).format(format);
};
