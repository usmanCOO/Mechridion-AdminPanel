import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import BlockIcon from "@mui/icons-material/Block";

import { withApollo } from "lib/apollo/withApollo";
import useAccount from "hooks/accounts/useAccount";
import useUpdateAccount from "hooks/auth/useUpdateAccount";
import { toast } from "react-toastify";

import { CircularProgress, Pagination } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import Moment from "react-moment";

const UserDetail = () => {
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [userData, loading, refetch, totalCount] = useAccount({
    offset: offset,
    first: itemsPerPage,
  });

  const [updateData, loadingUpdate] = useUpdateAccount();

  const [modalOpen, setModalOpen] = useState(false);
  const [userid, setUserId] = useState(null);

  useEffect(() => {
    let page = Math.ceil(totalCount / itemsPerPage);
    setPageCount(page);
  }, [totalCount]);

  const handlePageClick = (event, page) => {
    setOffset((page - 1) * itemsPerPage);
    setCurrentPage(page);
  };

  const openModal = (id) => {
    setModalOpen((oldState) => !oldState);
    setUserId(id);
  };

  const updateUserSubmit = async (id) => {
    try {
      const result = await updateData({
        variables: { accountId: id, isActive: false },
      });
      if (result) {
        refetch();
        toast.success("Inactive User Successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await updateData({
        variables: { accountId: userid, isDeleted: true },
      });
      if (result) {
        refetch();
        toast.success("Deleted Successfully");
        closeModal();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

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
                // data-modal-hide="defaultModal"
                type="button"
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
              >
                Delete
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}

      <div className="text-2xl text-[#FB4516] font-medium pb-6">
        User Detail
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
                Email
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                Plan Type
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                isActive
              </TableCell>
              <TableCell sx={{ fontSize: "18px", fontWeight: 600 }}>
                Subscription Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row?.firstName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.primaryEmailAddress}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.StripeUserInfo?.planName}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row?.isActive?.toString()}
                </TableCell>

                <TableCell component="th" scope="row">
                  {row?.StripeUserInfo?.subscriptionDate ? (
                    <Moment format="ddd MMM DD YYYY">
                      {row?.StripeUserInfo?.subscriptionDate}
                    </Moment>
                  ) : (
                    ""
                  )}
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => updateUserSubmit(row?._id)}>
                    <BlockIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => openModal(row?._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default withApollo()(UserDetail);
