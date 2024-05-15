import { baseApi } from "../../api/baseApi";

const questionApiService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionByProductId: builder.query({
      query: (id) => ({
        url: `questions?product.productId=${id}`,
      }),
      providesTags: ["Questions"]
    }),
  }),
});

export const { useGetQuestionByProductIdQuery } = questionApiService;
