import React, { useState, useEffect } from "react";
import useGetAllVehicleVariant from "hooks/VehicleVariant/useGetAllVehicleVariant";
import { withApollo } from "lib/apollo/withApollo";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import {
  Pagination,
  CircularProgress,
  Modal,
  Box,
  IconButton,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VariantManagement = () => {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = useState(null);
  const handleClose = () => setOpen(false);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [vehicleVariantData, loading, refetch, totalCount] =
    useGetAllVehicleVariant({
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
      field: "brand",
      headerName: "Brand",
      width: 150,
      editable: false,
    },
    {
      field: "model",
      headerName: "Model",
      width: 150,
      editable: false,
    },
    {
      field: "generation",
      headerName: "Generation",
      width: 270,
      editable: false,
    },
    {
      field: "engineCode",
      headerName: "Engine",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return `${params?.row?.engineSpec?.engineCode}`;
      },
    },
    {
      field: "drive",
      headerName: "Drive",
      width: 180,
      editable: false,
    },
    // {
    //   field: "cylinders",
    //   headerName: "Cylinders",
    //   width: 120,
    //   editable: false,
    // },
    {
      field: "engineOil",
      headerName: "Engine Oil",
      width: 180,
      editable: false,
      valueGetter: (params) => {
        return `${params?.row?.engineOilSpecs?.oil}`;
      },
    },
    {
      field: "gearBoxType",
      headerName: "Gear Box",
      width: 120,
      editable: false,
    },
    {
      field: "torqueRpm",
      headerName: "Torque RPM",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        return `${params?.row?.torqueValue?.torqueRpm}`;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <button
            onClick={() => {
              const selectedRow = params?.row;
              if (selectedRow) {
                setRowData({
                  id: selectedRow?._id,
                  fuelSystem: selectedRow?.fuelSystem,
                  frontSuspension: selectedRow?.Suspension?.frontSuspension,
                  rearSuspension: selectedRow?.Suspension?.rearSuspension,
                  valveTrain: selectedRow?.valveTrain,
                  power: selectedRow?.powerSpec?.power,
                  powerHp: selectedRow?.powerSpec?.powerHp,
                  powerRpm: selectedRow?.powerSpec?.powerRpm,
                  powerRpmLow: selectedRow?.powerSpec?.powerRpmLow,
                  powerTrain: selectedRow?.powerSpec?.powerTrain,
                  frontBrakes: selectedRow?.brakes?.frontBrakes,
                  rearBrakes: selectedRow?.brakes?.rearBrakes,
                  rimSizes: selectedRow?.rimsSize?.all,
                  tireSizes: selectedRow?.tireSize?.all,
                  bore: selectedRow?.bore,
                  positionCylinders: selectedRow?.positionCylinders,
                  turbine: selectedRow?.turbine,
                  compressionRatio: selectedRow?.compressionRatio,
                  coolant: selectedRow?.coolant,
                  engineOilCapacity:
                    selectedRow?.engineOilSpecs?.engineOilCapacity,
                  engineCode: selectedRow?.engineSpec?.engineCode,
                  enginePosition: selectedRow?.engineSpec?.enginePosition,
                  engineDisplacement:
                    selectedRow?.engineSpec?.engineDisplacement,
                });
                setOpen(true);
              }
            }}
            className="bg-[#FF5B39] h-8 rounded-sm w-full  font-medium text-base"
          >
            View Detail
          </button>
        );
      },
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
      <div className="text-2xl text-[#FB4516] font-medium pb-6">Variant Detail</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="text-xl font-medium text-[#FB4516]">
                Variant Detail
              </h1>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className="text-base font-normal">Bore : {rowData?.bore}</div>
            <div className="text-base font-normal">
              Coolant: {rowData?.coolant}
            </div>
            <div className="text-base font-normal">
              Fuel System: {rowData?.fuelSystem}
            </div>
            <div className="text-base font-normal">
              Front Suspension: {rowData?.frontSuspension}
            </div>
            <div className="text-base font-normal">
              Rear Suspension: {rowData?.rearSuspension}
            </div>
            <div className="text-base font-normal">
              Valve Train: {rowData?.valveTrain}
            </div>
            <div className="text-base font-normal">Power: {rowData?.power}</div>
            <div className="text-base font-normal">
              Power Hp: {rowData?.powerHp}
            </div>
            <div className="text-base font-normal">
              Power Rpm : {rowData?.powerRpm}
            </div>
            <div className="text-base font-normal">
              Power Rpm Low : {rowData?.powerRpmLow}
            </div>
            <div className="text-base font-normal">
              Power Train : {rowData?.powerTrain}
            </div>
            <div className="text-base font-normal">
              Front Brakes: {rowData?.frontBrakes}
            </div>
            <div className="text-base font-normal">
              Rear Brakes: {rowData?.rearBrakes}
            </div>
            <div className="text-base font-normal">
              Tire Sizes: {rowData?.tireSizes}
            </div>
            <div className="text-base font-normal">
              Rim Sizes: {rowData?.rimSizes}
            </div>
            <div className="text-base font-normal">
              Position Cylinders : {rowData?.positionCylinders}
            </div>
            <div className="text-base font-normal">
              Turbine : {rowData?.turbine}
            </div>
            <div className="text-base font-normal">
              Compression Ratio : {rowData?.compressionRatio}
            </div>
            <div className="text-base font-normal">
              Engine Oil Capacity : {rowData?.engineOilCapacity}
            </div>
            <div className="text-base font-normal">
              Engine Code : {rowData?.engineCode}
            </div>
            <div className="text-base font-normal">
              Engine Position : {rowData?.enginePosition}
            </div>
            <div className="text-base font-normal">
              Engine Displacement : {rowData?.engineDisplacement}
            </div>
          </div>
        </Box>
      </Modal>

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
        rows={
          vehicleVariantData
            ? vehicleVariantData?.getAllVehicleVariant?.nodes
            : []
        }
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

export default withApollo()(VariantManagement);
