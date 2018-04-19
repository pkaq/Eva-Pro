export default {
  namespace: 'theme',
  state: {
    theme: null,
  },
  reducers: {
    switchTheme(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
