import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { withApollo } from "lib/apollo/withApollo";
import UseGetAllServices from "hooks/services/useGetAllServices";
import UseDeleteServices from "hooks/services/useDeleteServices";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import { ClickAwayListener } from "@mui/base";
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("BMW", "Toyota Camry", "Internal Combustion Engines"),
//   createData("Hyundai", "Ford Mustang", "Hybrid Engines"),
//   createData("Tesla", "Honda Civic", "Electric Engines"),
//   createData("Mitsubishi", "Mercedes-Benz C-Class", "Rotary Engines"),
//   createData("Suzuki", "Hyundai Elantra", "Hydrogen Fuel Cell Engines"),
// ];

const ServicesDetail = () => {
  const navigate = useNavigate();
  const [servicesData, loading, refetch] = UseGetAllServices();
  const [deleteService, loadingDeleteService] = UseDeleteServices();
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  const openModal = (id) => {
    setModalOpen((oldState) => !oldState);
    setServiceId(id);
  };

  const handleSubmit = async () => {
    try {
      const result = await deleteService({
        variables: { id: serviceId },
      });
      if (result) {
        refetch();
        toast.success("Deleted Service Successfully");
        closeModal();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative">
      {modalOpen && (
        <ClickAwayListener onClickAway={closeModal}>
          <div className="absolute p-4 top-[20%] left-[30%]  w-[500px] h-[auto] bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex p-4 border-b rounded-t dark:border-gray-600 gap-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Are you sure you want to delete?
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="flex justify-end items-center py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                // data-modal-hide="defaultModal"
                type="button"
                className="text-black rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                // data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
              >
                Delete
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}

      <div className="flex justify-between items-center mb-5">
        <div className="text-2xl text-[#FB4516] font-medium">
          Services Detail
        </div>
        <button
          className="bg-[#FF5B39] p-2 m-2 font-medium"
          onClick={() => navigate("/addservices")}
        >
          Add Services
        </button>
      </div>

      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "#23638C",
            }}
          >
            <TableRow>
              <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                Description
              </TableCell>
              {/* <TableCell>Image</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesData?.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.description}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  <img src={row?.imageLink}></img>
                </TableCell> */}

                <TableCell align="right">
                  <IconButton
                    onClick={() => navigate(`/updateservices?id=${row?._id}`)}
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openModal(row?._id.toString())}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default withApollo()(ServicesDetail);
