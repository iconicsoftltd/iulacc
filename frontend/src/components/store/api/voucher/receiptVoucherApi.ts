import { apiSlice } from "../../rootApi/apiSlice";

export const voucherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE VOUCHER
    createVoucher: builder.mutation({
      query: (body) => {
        const selectedBranch = localStorage.getItem("selectedBranch");
        const branchId = selectedBranch ? JSON.parse(selectedBranch).id : "";
        return {
          url: "/voucher/create-voucher",
          method: "POST",
          body: { ...body, branchId },
        };
      },
      invalidatesTags: ["voucher"],
    }),

    // GET ALL VOUCHERS
    getAllVouchers: builder.query({
      // ↓ archived param যোগ হয়েছে
      query: ({ page = 1, size = 10, search = "", type = "", archived = false, date = "" }) => {
        const selectedBranch = localStorage.getItem("selectedBranch");
        const branchId = selectedBranch ? JSON.parse(selectedBranch).id : "";
        let queryParams = `?page=${page}&size=${size}&type=${type}`;
        if (search) queryParams += `&search=${encodeURIComponent(search)}`;
        if (branchId) queryParams += `&branchId=${branchId}`;
        if (date) queryParams += `&date=${encodeURIComponent(date)}`;
        // ↓ নতুন লাইন
        queryParams += `&archived=${archived}`;
        return {
          url: `/voucher/get-voucher-all${queryParams}`,
          method: "GET",
        };
      },
      providesTags: ["voucher"],
    }),

    // GET VOUCHER BY ID
    getVoucherById: builder.query({
      query: (id) => ({
        url: `/voucher/get-voucher/${id}`,
        method: "GET",
      }),
      providesTags: ["voucher"],
    }),

    // UPDATE VOUCHER
    updateVoucher: builder.mutation({
      query: ({ id, ...body }) => {
        const selectedBranch = localStorage.getItem("selectedBranch");
        const branchId = selectedBranch ? JSON.parse(selectedBranch).id : "";
        return {
          url: `/voucher/update-voucher/${id}`,
          method: "PUT",
          body: { ...body, branchId },
        };
      },
      invalidatesTags: ["voucher"],
    }),

    // DELETE VOUCHER
    deleteVoucher: builder.mutation({
      query: (id) => ({
        url: `/voucher/delete-voucher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["voucher"],
    }),

    // ARCHIVE VOUCHER — নতুন
    archiveVoucher: builder.mutation({
      query: (id) => ({
        url: `/voucher/archive-voucher/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["voucher"],
    }),

    // RESTORE VOUCHER — নতুন
    restoreVoucher: builder.mutation({
      query: (id) => ({
        url: `/voucher/restore-voucher/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["voucher"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useCreateVoucherMutation,
  useGetAllVouchersQuery,
  useGetVoucherByIdQuery,
  useUpdateVoucherMutation,
  useDeleteVoucherMutation,
  useArchiveVoucherMutation, // নতুন
  useRestoreVoucherMutation, // নতুন
} = voucherApi;