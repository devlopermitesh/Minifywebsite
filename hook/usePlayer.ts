import { create } from "zustand";

interface PlayerStore {
    ids: number[];
    activeId: number | null;
    setIds: (ids: number[]) => void;
    setActiveId: (id: number) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids: [],
    activeId: null,
    setIds: (ids) => set({ ids }),
    setActiveId: (id) => set({ activeId: id }),
    reset: () => set({ ids: [], activeId: null }),
}));

export default usePlayer;
