export const initialState = {
  loading: true,
  transactions: [],
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_ETHEREUM_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_ETHEREUM_SUCCESS":
      return {
        ...state,
        loading: false,
        transactions: action.payload
      };
    case "SEARCH_ETHEREUM_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};
