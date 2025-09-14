export const createNavSlice: all.store.CreateNavSliceType = (set) => ({
    route: "home",
    to: (route: string) => set({ route }),
})
