import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = 'YYYY-MM-DD ';

export function formatToDateTime(date: number | string | Date, formatStr?: string): string {
  return dayjs(date).format(formatStr ?? DATE_TIME_FORMAT);
}

export function formatToDate(date: number | Date | string, formatStr?: string): string {
  return dayjs(date).format(formatStr ?? DATE_FORMAT);
}
