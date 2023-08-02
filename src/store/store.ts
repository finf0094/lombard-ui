import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authReducer/authApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import authReducer from './authReducer/authSlice'
import { userApi } from './userReducer/userApi';
import ticketSlice from './TicketReducer/ticketSlice';
import { ticketApi } from "../store/TicketReducer/ticketApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketSlice,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ticketApi.reducerPath]: ticketApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, ticketApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);