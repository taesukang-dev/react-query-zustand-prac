import create from 'zustand'
import produce from 'immer'

const useZustand = create((set) => ({
  viewAdd: false,
  viewModify: false,
  setViewAdd: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.viewAdd = !draft.viewAdd
      })
    ),
  setViewModify: () =>
    set((state) =>
      produce(state, (draft) => {
        draft.viewModify = !draft.viewModify
      })
    ),
}))

export default useZustand
