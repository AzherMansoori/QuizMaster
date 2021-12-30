import {
  createSlice,
} from "@reduxjs/toolkit";


const categorySlice = createSlice({
  name: "category",
  initialState: {
    catList: null,
    loading: false,
  },
  reducers: {
    getCategoriesStarted: (state, action) => {
      return {
        catList: state.catList,
        loading: true
      };
    },
    getCategoriesSuccess: (state, action) => {
      return {
        catList: action.payload,
        loading: false
      };
    },
    getCategoriesFailure: (state, action) => {
      return {
        catList: action.payload,
        loading: false
      };
    }
  }
});

export const {
  getCategoriesStarted,
  getCategoriesSuccess,
  getCategoriesFailure
} = categorySlice.actions;

//reducer
export default categorySlice.reducer;