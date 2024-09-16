import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserPublic } from '@types/types';

const initialState:IUserPublic = {
  id:null,
  username:null,
  email:null,
  phoneNumber:null,
  accountPublicKey:null,
  kycStatus:null,
  customerProfile:null,
  actionType:null,
  category:null,
  note:null,
  userTransactions: null,
}

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    updateUser: (state, action: PayloadAction<Partial<IUserPublic>>) => {
      const payload = action.payload;
      if (payload.id) {
        state.id = payload.id;
      }
      if (payload.username) {
        state.username = payload.username;
      }
      if (payload.email) {
        state.email = payload.email;
      }
      if (payload.phoneNumber) {
        state.phoneNumber = payload.phoneNumber;
      }
      if (payload.accountPublicKey) {
        state.accountPublicKey = payload.accountPublicKey;
      }
      if (payload.kycStatus) {
        state.kycStatus = payload.kycStatus;
      }
      if (payload.customerProfile) {
        state.customerProfile = payload.customerProfile;
      }
      if (payload.actionType) {
        state.actionType = payload.actionType;
      }
      if (payload.category) {
        state.category = payload.category;
      }
      if (payload.note) {
        state.note = payload.note;
      }
      if (payload.userTransactions) {
        state.userTransactions = payload.userTransactions;
      }
    },
  }
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer;