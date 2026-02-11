import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthday: Date | null;
  paidClasses: number;
  planIncludes: string[];
  paymentStatus: "paid" | "pending" | "overdue";
  active: boolean;
  lastActive: Date | null;
};

type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: string, data: Partial<User>) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  users: [], // initialize empty, load mock data later
  setUsers: (users) => set({ users }),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
    })),
}));
