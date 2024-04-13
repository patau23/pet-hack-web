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
      query: (body: { email: string; password: string }) => {
        return {
          url: "/users/signin",
          method: "post",
          body,
        }
      }
    }),
    registerUser: builder.mutation({
      query: (body: { firstName: string; lastName: string; email: string; password: string }) => {
        return {
          url: "/register",
          method: "post",
          body: {
            ...body,
            role: "Your_role"
          },
        }
      }
    })
  })
})

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;