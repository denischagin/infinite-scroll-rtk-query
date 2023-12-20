import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {GetComments} from "../models";

export const commentsApi = createApi({
    reducerPath: "comments-api",
    baseQuery: fetchBaseQuery(),
    endpoints: (builder) => ({
        getComments: builder.query<GetComments, { page: number }>({
            query: ({page}) => ({
                url: `https://jsonplaceholder.typicode.com/comments`,
                params: {_page: page},
            }),
        })
    })

})

export const {useGetCommentsQuery} = commentsApi