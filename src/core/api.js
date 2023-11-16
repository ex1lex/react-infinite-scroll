import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonPlaceholderApi = createApi({
	reducerPath: 'jsonPlaceholderApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://jsonplaceholder.typicode.com/',
	}),
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: (page) => `posts?_page=${page}&_limit=20`,
		}),
		getPost: builder.query({
			query: (postId) => `posts/${postId}`,
		}),
	}),
});

export const { useGetPostsQuery, useGetPostQuery } = jsonPlaceholderApi;
