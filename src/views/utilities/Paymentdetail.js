import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Divider } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { withApollo } from "lib/apollo/withApollo";
import useGetStripDetail from "hooks/payment/useGetAllStripePayment";
import CircularProgress from "@mui/material/CircularProgress";

const PaymentDetail = () => {
  const [stripeDetail, loading, refetch] = useGetStripDetail();
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  const columns = [
    {
      field: "customerName",
      width: 250,
      headerName: "Name",
      valueGetter: (params) => {
        return params?.row?.node?.StripeUserInfo !== null
          ? `${params?.row?.node?.StripeUserInfo?.stripeUserData?.customerName}`
          : "";
      },
    },
    {
      field: "paymentAmount",
      width: 250,
      headerName: "Amount",
      valueGetter: (params) => {
        return params?.row?.node?.StripeUserInfo !== null
          ? `${params?.row?.node?.StripeUserInfo?.stripeUserData?.paymentAmount}`
          : "";
      },
    },
    {
      field: "subscriptionStatus",
      width: 250,
      headerName: "Active",
      valueGetter: (params) => {
        return params?.row?.node?.StripeUserInfo !== null
          ? `${params?.row?.node?.StripeUserInfo?.stripeUserData?.subscriptionStatus}`
          : "";
      },
    },
    {
      field: "currency",
      width: 250,
      headerName: "Currency",
      valueGetter: (params) => {
        return params?.row?.node?.StripeUserInfo !== null
          ? `${params?.row?.node?.StripeUserInfo?.currency}`
          : "";
      },
    },
    {
      field: "planName",
      width: 250,
      headerName: "Plan Name",
      valueGetter: (params) => {
        return params?.row?.node?.StripeUserInfo !== null
          ? `${params?.row?.node?.StripeUserInfo?.planName}`
          : "";
      },
    },
  ];

  return (
    <div className="items-center ">
      <div className="text-2xl font-medium text-[#FB4516] mb-8">
        Payment Detail
      </div>

      <Divider />

      <DataGrid
        sx={{
          ".MuiDataGrid-columnHeaders": {
            // display:"flex",
            // justifyContent:"center",
            backgroundColor: "#23638C",
            color: "white",
            fontSize: "18px",

            fontWeight: 600,
            // borderRadius: "4px",

            // px: 3,
          },
          color: "white",

          "& .MuiTablePagination-displayedRows": {
            color: "white", // Change this to your desired color
          },
        }}
        rows={stripeDetail ? stripeDetail?.edges : []}
        columns={columns}
        getRowId={(row) => row?.node?._id}
        hideFooter={true}
      />
    </div>
  );
};

export default withApollo()(PaymentDetail);
