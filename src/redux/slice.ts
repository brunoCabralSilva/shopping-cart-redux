import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: { list: IList[] } = { list: [] };

interface IList {
  permalink: string;
  thumbnail: string;
  title: string;
  price: string;
  seller: { nickname: string };
};

const slice: Slice = createSlice({
  name: 'celltech',
  initialState: INITIAL_STATE,
  reducers: {
    addFavorite(state, { payload }: PayloadAction<IList>) {
      return { list: [...state.list, payload] };
    },
  },
});

export default slice.reducer;

export const { addFavorite } = slice.actions;

export const useSlice = (state: any) => {
  return state.slice;
};
