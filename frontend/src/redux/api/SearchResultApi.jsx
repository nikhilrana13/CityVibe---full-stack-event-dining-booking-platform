import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "./BaseQuery";





export const SearchResultApi = createApi({
    reducerPath: "SearchResult",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        // get search results
        GetSearchResults: builder.query({
            query: ({ city, type, query }) => ({
                url: "/api/search",
                params: {
                    city,
                    type,
                    query
                }
            })
        })
    })
})

export const {useGetSearchResultsQuery} = SearchResultApi