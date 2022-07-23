import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ALL_COUNTRIES } from '../../pages/config';
import { RootState } from '../store';

export type CountryItemType = {
  capital: [string];
  flags: { png: string; svg: string };
  name: { common: string };
  population: number;
  region: string;
};

export interface CountryStateType {
  items: CountryItemType[];
}

export const fetchCountry = createAsyncThunk<CountryItemType[]>(
  'country/fetchCountry',
  async () => {
    const response = await axios.get(ALL_COUNTRIES);
    return response.data;
  },
);

const countryState: CountryStateType = {
  items: [],
};

const countrySlice = createSlice({
  name: 'country',
  initialState: countryState,
  reducers: {
    setCountry(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.pending, (state) => {
      state.items = [];
    });
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchCountry.rejected, (state) => {
      state.items = [];
    });
  },
});

export const countrySelect = (state: RootState) => state.countrySlice.items;
export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
