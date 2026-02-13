import { create } from "zustand";

export type ClassType =
  | "muay_thai"
  | "sipalki_do"
  | "competidores"
  | "kick_boxing"
  | "boxeo"
  | "boxeo_comp_thai"
  | "yoga";

export type UserPlan = {
  classType: ClassType;
  totalClasses: number;
  amountPaid: number;
  pricePerClass?: number;
};

export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  birthday: Date | null;

  classes: UserPlan[];

  active: boolean;
  lastActive: Date | null;
};

type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
  updateUser: (id: string, data: Partial<User>) => void;
};

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  updateUser: (id, data) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, ...data } : u
      ),
    })),
}));
