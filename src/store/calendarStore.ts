import { create } from "zustand";
import type { CalendarEvent } from "../types/calendar";

type CalendarState = {
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;
  updateEvent: (id: string, updated: CalendarEvent) => void;
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

  updateEvent: (id, updated) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...updated, id } : e
      ),
    })),

  setEvents: (events) => set({ events }),
}));
