import React, { useState, useEffect } from "react";

import useGetVehicleData from "hooks/vehicleModel/useGetAllVehicleModel";
import { withApollo } from "lib/apollo/withApollo";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination, CircularProgress } from "@mui/material";

const ModelManagement = () => {
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [vehicleData, loading, refetch, totalCount] = useGetVehicleData({
    offset: offset,
    first: itemsPerPage,
  });

  const handlePageClick = (event, page) => {
    setOffset((page - 1) * itemsPerPage);
    setCurrentPage(page);
  };

  useEffect(() => {
    let page = Math.ceil(totalCount / itemsPerPage);
    setPageCount(page);
  }, [totalCount]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 350,
      editable: true,
    },
    {
      field: "modelYear",
      headerName: "Model Year",
      width: 200,
      editable: true,
    },
    {
      field: "generationID",
      headerName: "Generation ID",
      width: 300,
      editable: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl text-[#FB4516] pb-6">Model Detail</div>

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
        rows={vehicleData ? vehicleData?.getAllVehicleModel?.nodes : []}
        columns={columns}
        getRowId={(row) => row?._id}
        hideFooter={true}
      />
      <div className="flex justify-center pt-6">
        {totalCount && (
          <Pagination
            page={currentPage}
            defaultPage={1}
            count={pageCount}
            onChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
};

export default withApollo()(ModelManagement);
