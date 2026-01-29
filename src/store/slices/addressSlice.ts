import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUserAddresses, getDefaultAddressId, saveUserAddress, deleteUserAddress as deleteAddressStorage, setDefaultAddressId as persistDefaultAddress } from "../../utils/addressStorage";
import type { Address, AddressState } from "../../types/address.types";


const initialState: AddressState = {
  list: getUserAddresses(),
  defaultId: getDefaultAddressId() ?? undefined,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addAddress(state, action: PayloadAction<Address>) {
      saveUserAddress(action.payload); // persist
      state.list = getUserAddresses();
      state.defaultId =
        state.defaultId || action.payload.id;
    },

    deleteAddress(state, action: PayloadAction<string>) {
      deleteAddressStorage(action.payload); // persist
      state.list = getUserAddresses();
      if (state.defaultId === action.payload) {
        state.defaultId = state.list[0]?.id;
        if (state.defaultId) {
          persistDefaultAddress(state.defaultId);
        }
      }
    },

    setDefaultAddress(state, action: PayloadAction<string>) {
      persistDefaultAddress(action.payload);
      state.defaultId = action.payload;
    },
  },
});

export const { addAddress, deleteAddress, setDefaultAddress   } = addressSlice.actions;

export default addressSlice.reducer;
