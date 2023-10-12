import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CurrencyService from "../../services/currencies";
import { ICurrency } from "../../interfaces/currencies";
import { ICurrencyRequestParams, ISortRequestParams } from "../../interfaces/request";

export const fetchCurrencies = createAsyncThunk(
  "currencies/fetchCurrencies",
  async (currency: ICurrencyRequestParams) => {
    return await CurrencyService.getAllCurrencies(
      currency.name,
      currency.value
    );
  }
);

export const fetchCurrencyConversions = createAsyncThunk(
  "currencies/fetchCurrencyConversions",
  async (currency?: ISortRequestParams) => {
    return await CurrencyService.getAllCurrencyConversions(
      currency?.sort,
      currency?.order
    );
  }
);

interface CurrencyState {
  data: ICurrency[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  dataList: ICurrency[];
}

const initialState: CurrencyState = {
  data: [],
  status: "idle",
  error: null,
  dataList: [],
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    ResetState(state) {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchCurrencyConversions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencyConversions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataList = action.payload;
      })
      .addCase(fetchCurrencyConversions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectCurrencies = (state: any) => state.currencies.data;
export const selectCurrencyConversions = (state: any) =>state.currencies.dataList;

export const { ResetState } = currencySlice.actions;
export default currencySlice.reducer;
