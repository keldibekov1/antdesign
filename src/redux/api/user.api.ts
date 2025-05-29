import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        method: "GET",
        url:  '/student',
        params
      }),
      providesTags: ["USERS"]
    }),

    createUser: build.mutation({
      query: (body) => ({
        method: "POST",
        url:  '/student',
        body
        
      }),
      invalidatesTags: ["USERS"]
    }),

    updateUser: build.mutation({
      query: ({id,body}) => ({
        method: "PUT",
        url:  `/student/${id}`,
        body
        
      }),
      invalidatesTags: ["USERS"]
    }),
     deleteUser: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url:  `/student/${id}`,
       
        
      }),
      invalidatesTags: ["USERS"]
    }),
    
  }),
  overrideExisting: false,
})

export const { useGetUsersQuery ,useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = extendedApi