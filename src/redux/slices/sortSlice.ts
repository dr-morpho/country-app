import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SortStateType {
  sort: string;
  search: string;
}

const sortState: SortStateType = {
  sort: 'All',
  search: '',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState: sortState,
  reducers: {
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const searchSelector = (state: RootState) => state.sortSlice.search;
export const sortSelector = (state: RootState) => state.sortSlice.sort;
export const { setSort, setSearch } = sortSlice.actions;
export default sortSlice.reducer;
