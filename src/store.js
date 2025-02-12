import { create } from "zustand";

const useStore = create((set) => ({
  display: "",
  result: null,
  setDisplay: (display) => set({ display }),
  setResult: (result) => set({ result }),
  clear: () => set({ display: "", result: null }),
}));

export default useStore;