import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authApiName, authApiSource } from '../../../../consts';

export const authApi = createApi({
  reducerPath: authApiName,
  baseQuery: fetchBaseQuery({
    baseUrl: authApiSource,
    // headers: {
    //   'Content-Type': 'application/json',
    //   'X-RapidAPI-Key': 'bbabfb5e36msha737f55efc17eb3p1f8cf5jsn00394d3c9fae',
    //   'X-RapidAPI-Host': 'jwt-bearer-auth1.p.rapidapi.com'
    // }
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "/auth/login",
          method: "post",
          body,
        }
      }
    }),
    registerUser: builder.mutation({
      query: (body: { username: string, email: string; password: string }) => {
        return {
          url: "/auth/signup",
          method: "post",
          body,
        }
      }
    })
  })
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;