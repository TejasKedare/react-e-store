import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserAddresses, getDefaultAddressId } from "../../utils/addressStorage";
import type { Address, AddressState } from "../../types/address.types";



const initialState: AddressState = {
  list: getUserAddresses(),
  defaultId: getDefaultAddressId() ?? undefined,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.list = action.payload;
    },
    setDefaultAddress(state, action: PayloadAction<string>) {
      state.defaultId = action.payload;
    },
  },
});

export const { setAddresses, setDefaultAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
