import { create } from "zustand";
import type { CalendarEvent } from "../types/calendar";

type CalendarState = {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;
  setEvents: (events: CalendarEvent[]) => void;
};

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: crypto.randomUUID() }],
    })),

  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  setEvents: (events) => set({ events }),
}));
