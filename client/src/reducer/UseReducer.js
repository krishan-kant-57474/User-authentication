export const initialState = null;

export const reducer = (state, action) => {
  console.log("hii");
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
