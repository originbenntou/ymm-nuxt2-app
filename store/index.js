export const state = () => ({
  selected: []
})

export const mutations = {
  add(state, { value }) {
    state.selected.push(value)
  },
  remove(state, { value }) {
    state.selected.splice(state.selected.indexOf(value), 1)
  },
}
