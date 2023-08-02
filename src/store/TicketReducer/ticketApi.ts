import { createApi } from '@reduxjs/toolkit/query/react'
import { FormedContractDataResponse, TicketData } from '../../types/Contract.types'
import { baseQuery } from '../userReducer/userApi'

export const ticketApi = createApi({
  reducerPath: 'ticketApi',
  baseQuery,
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (body: TicketData) => {
        return {
          url: "create-contract",
          method: "post",
          body,
        }
      }
    }),
    getFormedContracts: builder.query<FormedContractDataResponse[], number>({
      query: () => {
        return {
          url: "formed-contracts",
          method: "get",
        }
      }
    }),
    deleteFormedContract: builder.mutation({
      query: (id: number) => {
        return {
          url: "delete-formed-contract/" + id,
          method: "delete"
        }
      }
    }),
    getContract: builder.query<FormedContractDataResponse, number>({
      query: (id: number) => {
        return {
          url: "contract/" + id,
          method: "get"
        }
      }
    }),
    toggleIssuedFalseToTrue: builder.mutation({
      query: (id: number) => {
        return {
          url: "contract/" + id + "/print",
          method: "post"
        }
      }
    }),
    getContractByClientIin: builder.query<FormedContractDataResponse[], string>({
      query: (iin: string) => {
        return {
          url: "find-by-iin/" + iin,
          method: "get"
        }
      }
    })
  }),
})

export const { useCreateTicketMutation, useGetFormedContractsQuery, useDeleteFormedContractMutation, useGetContractQuery, useToggleIssuedFalseToTrueMutation, useGetContractByClientIinQuery } = ticketApi;