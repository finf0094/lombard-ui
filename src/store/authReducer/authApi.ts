import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IAuth } from './IAuth'
import { BASE_URL } from '../constants'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
        query: (body: IAuth) => {
            return {
                url: "auth",
                method: "post",
                body,
            }
        }
    })
  }),
})

export const {useLoginUserMutation} = authApi