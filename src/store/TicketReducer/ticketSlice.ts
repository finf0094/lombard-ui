import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CustomerFormData, ProductFormData, TicketData } from '../../types/Contract.types'


const product: ProductFormData = {
    condition: '',
    productType: '',
    category: '',
    model: '',
    memory: '',
    packaging: false,
    serialNumber: '',
    imei: 123456789123456,
    description: '',
    days: 1,
    sum: 1,
    confirmSum: 1
}

const customer: CustomerFormData = {
    iin: '',
    fullname: '',
    passNumber: 1,
    phone_number: '',
    city: '',
    address: '',
    birthDate: new Date().toISOString(),
    dateOfIssue: new Date().toISOString(),
    email: '',
}

const initialState: TicketData = {
    product: product,
    client: customer
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductFormData>) => {
        console.log(state)
      state.product = action.payload
    },
    setCustomer: (state, action: PayloadAction<CustomerFormData>) => {
        state.client = action.payload
    }
  },
})

export const selectAuth = (state: RootState) => state.auth

export const { setProduct, setCustomer } = ticketSlice.actions

export default ticketSlice.reducer