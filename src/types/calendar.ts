export type CalendarEvent = {
  id?: string;
  title: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: string;
  endRecur?: string;
  backgroundColor: string;
  borderColor: string;
  extendedProps?: {
    instructor: string;
  };
};
