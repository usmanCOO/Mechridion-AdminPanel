import React from "react";
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
import { useState } from "react";
import ReactPaginate from "react-paginate";
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import { ClickAwayListener } from "@mui/base";
import "./CarManagement.css";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const makeData = [
  {
    id: 1,
    make: "Honda",
  },
  { id: 2, make: "Toyota" },
  { id: 3, make: "Suzuki" },
  { id: 4, make: "Ford" },
];

const rows = [
  createData("BMW", "Toyota Camry", "Internal Combustion Engines"),
  createData("Hyundai", "Ford Mustang", "Hybrid Engines"),
  createData("Tesla", "Honda Civic", "Electric Engines"),
  createData("Mitsubishi", "Mercedes-Benz C-Class", "Rotary Engines"),
  createData("Suzuki", "Hyundai Elantra", "Hydrogen Fuel Cell Engines"),

  createData("BMW", "Toyota Camry", "Internal Combustion Engines"),
  createData("Hyundai", "Ford Mustang", "Hybrid Engines"),
  createData("Tesla", "Honda Civic", "Electric Engines"),
  createData("Mitsubishi", "Mercedes-Benz C-Class", "Rotary Engines"),
  createData("Suzuki", "Hyundai Elantra", "Hydrogen Fuel Cell Engines"),

  createData("Tesla", "Honda Civic", "Electric Engines"),
  createData("Mitsubishi", "Mercedes-Benz C-Class", "Rotary Engines"),
  createData("Suzuki", "Hyundai Elantra", "Hydrogen Fuel Cell Engines"),
  createData("BMW", "Toyota Camry", "Internal Combustion Engines"),
  createData("Hyundai", "Ford Mustang", "Hybrid Engines"),

  createData("Tesla", "Honda Civic", "Electric Engines"),
  createData("Mitsubishi", "Mercedes-Benz C-Class", "Rotary Engines"),
  createData("Suzuki", "Hyundai Elantra", "Hydrogen Fuel Cell Engines"),
  createData("BMW", "Toyota Camry", "Internal Combustion Engines"),
  createData("Hyundai", "Ford Mustang", "Hybrid Engines"),
];

const Brandmanagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the total number of pages
  const pageCount = Math.ceil(rows.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const currentItems = rows.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const openModal = (id) => {
    setModalOpen((oldState) => !oldState);
  };

  const openSearchModal = () => {
    setSearchModalOpen((oldState) => !oldState);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <div>
      {modalOpen && (
        <ClickAwayListener onClickAway={closeModal}>
          <div className="absolute p-4 top-[20%] left-[40%]  w-[500px] h-[auto] bg-white rounded-lg shadow dark:bg-gray-700">
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
                // onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
              >
                Delete
              </button>
            </div>
          </div>
        </ClickAwayListener>
      )}

      <div className="text-2xl text-[#FB4516] pb-6">Brand Detail</div>

      <div className="relative">
        <input
          className="appearance-none block text-black border-2 border-blue-600 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
          type="text"
          name="country"
          placeholder="Make/Model/Version"
          onSelect={openSearchModal}
          // value={values.country}
          // onChange={handleChange}
        />

        {searchModalOpen && (
          <ClickAwayListener onClickAway={closeSearchModal}>
            <div className="absolute top-[1px] p-4 w-[960px] h-[550px] bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex p-4 border-b rounded-t dark:border-gray-600 gap-4">
                <div className="w-2/6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Make
                  </h3>

                  <div>
                    {makeData.map((data, i) => {
                      return (
                        <div key={i}>
                          <div
                            onClick={() => console.log(data?.id)}
                            className="text-black text-[16px] my-4"
                          >
                            {data?.make}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="w-2/6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Model
                  </h3>
                </div>

                <div className="w-2/6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Variant
                  </h3>
                </div>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Engine</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={openModal}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default Brandmanagement;
