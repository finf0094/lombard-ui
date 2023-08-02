import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { authState } from "../authReducer/authSlice";

export const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    // Настройка заголовков запроса
    prepareHeaders: (headers) => {
        // Включение токена в заголовки запроса
        const data: authState = JSON.parse(localStorage.getItem('token') || "{}");
        const token = data.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

interface IRole {
    id: number
    name: string
}

interface IUserData {
    username: string
    email: string
    roles: IRole[]
}


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    endpoints: (builder) => ({
        // Определение эндпоинта
        getUserInformation: builder.query<IUserData, string>({
            query: () => 'user-information',
        })
    }),
});
