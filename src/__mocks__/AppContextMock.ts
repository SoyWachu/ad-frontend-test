export const useApp = jest.fn(() => ({
  state: {
    cart: [],
    games: [],
    loading: false,
    availableFilters: [],
    currentPage: 1,
    totalPages: 1,
  },
  dispatch: jest.fn(),
}));
