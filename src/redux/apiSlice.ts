import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { socket } from "../socket";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    credentials: "include",
  }),
  endpoints: (build) => ({
    connect: build.query({
      query: () => "",
    }),
    signUp: build.mutation({
      query: (user) => ({
        url: "signup",
        method: "POST",
        body: user,
      }),
    }),
    signIn: build.mutation({
      query: (user) => ({
        url: "signin",
        method: "POST",
        body: user,
      }),
    }),
    /*
    messageChannel: build.query({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { updateCachedData, cacheEntryRemoved }) {
        socket.connect();
        socket.on("message", () => {});
      },
    }),
    */
  }),
});

export const { useSignUpMutation, useSignInMutation, useConnectQuery } = api;
