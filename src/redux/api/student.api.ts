import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getStudents: build.query({
      query: (params) => ({
        method: "GET",
        url:  '/student',
        params
      }),
      providesTags: ["STUDENTS"]
    }),

    createStudent: build.mutation({
      query: (body) => ({
        method: "POST",
        url:  '/student',
        body
        
      }),
      invalidatesTags: ["STUDENTS"]
    }),

    updateStudent: build.mutation({
      query: ({id,body}) => ({
        method: "PUT",
        url:  `/student/${id}`,
        body
        
      }),
      invalidatesTags: ["STUDENTS"]
    }),
     deleteStudent: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url:  `/student/${id}`,
       
        
      }),
      invalidatesTags: ["STUDENTS"]
    }),
    
  }),
  overrideExisting: false,
})

export const { useGetStudentsQuery ,useCreateStudentMutation, useUpdateStudentMutation, useDeleteStudentMutation} = extendedApi