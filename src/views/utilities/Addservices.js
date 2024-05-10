import React from "react";
import { useState } from "react";
import { withApollo } from "lib/apollo/withApollo";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useCreateServices from "hooks/services/useCreateServices";

const Services = () => {
  const [formValues, setFormValues] = useState([
    {
      name: "",
      price: "",
      description: "",
    },
  ]);

  const [uname, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  // const [nameError, setNameError] = useState("");
  // const [priceError, setPriceError] = useState("");
  // const [descriptionError, setDescriptionError] = useState("");

  const navigate = useNavigate();
  const [createService, loadingCreateService] = useCreateServices();

  const addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        name: "",
        price: "",
        description: "",
      },
    ]);
  };

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];

    if (e.target.name === "name") {
      const formattedValue = e.target.value.replace(/[^a-zA-Z\s']/g, "");
      newFormValues[i][e.target.name] = formattedValue;
      newFormValues[i].nameError = "";
    } else if (e.target.name === "price") {
      newFormValues[i][e.target.name] = parseFloat(e.target.value);
      newFormValues[i].priceError = "";
    } else if (e.target.name === "description") {
      newFormValues[i][e.target.name] = e.target.value;
      newFormValues[i].descriptionError = "";
    } else newFormValues[i][e.target.name] = e.target.value;

    setFormValues(newFormValues);
  };

  const fileHandleChange = async (event) => {
    try {
      const file = event.target.files[0];

      // Check if the selected file is an image
      if (file && file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("isMulti", "false");
        formData.append("uploadPath", "/testupload");
        formData.append("photos", file);

        const requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };
        let result = await fetch(process.env.REACT_APP_IMAGE, requestOptions);
        result = await result.json();

        if (result) {
          setSelectedFile(result?.data[0]?.url[3].Location);
          toast("Image Uploaded Successfully");
        }
      } else {
        setSelectedFile("");
        toast("Please choose an image file");
      }
    } catch (error) {
      toast(error);
    }
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uname.trim() === "") {
      setNameError("Name is required");
      return;
    } else if (description.trim() === "") {
      setDescriptionError("Description is required");
      return;
    }

    const formErrors = formValues.map((element) => {
      let error = {};
      if (element.name === "") {
        error.nameError = "Service Type is required";
      }
      if (element.price === "") {
        error.priceError = "Service Price is required";
      }
      if (element.description === "") {
        error.descriptionError = "Service Description is required";
      }
      return error;
    });

    // Check if there are any errors
    if (formErrors.some((error) => Object.keys(error).length > 0)) {
      // Update the formValues with the errors
      const updatedFormValues = formValues.map((element, index) => ({
        ...element,
        ...formErrors[index],
      }));
      setFormValues(updatedFormValues);
      return;
    }

    try {
      const result = await createService({
        variables: {
          input: {
            shopId: "cmVhY3Rpb24vc2hvcDpwR1J5Wm1ibTZCcHBMOEVRRg==",
            service: {
              name: uname,
              description: description,
              imageLink: selectedFile,
              options: formValues?.map((option) => ({
                // ...option,
                name: option?.name,
                price: option?.price,
                description: option.description,
              })),
            },
          },
        },
      });

      if (result) {
        toast.success("Add Service Successfully");
        navigate("/servicesdetail");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <p className="text-white text-4xl font-bold flex justify-center items-center">
        Add Service
      </p>

      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-[100px] xl:mx-[180px] 2xl:mx-[360px]"
        >
          <div className="flex  mb-6 ">
            <div className="w-full md:w-full mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full  text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                type="text"
                value={uname}
                autoComplete="off"
                name="uname"
                onChange={(e) => {
                  const { value } = e.target;
                  const formattedValue = value.replace(/[^a-zA-Z\s']/g, "");
                  setNameError("");
                  // if (formattedValue !== value) {
                  //   setNameError(
                  //     "Special characters and numbers are not allowed"
                  //   );
                  // } else {
                  //   setNameError("");
                  // }

                  setName(formattedValue);
                }}
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>
          </div>
          <div className="flex mb-6">
            <div className="w-full">
              <label
                className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600 resize-none"
                value={description}
                name="description"
                autoComplete="off"
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                rows="6"
                type="text"
              />
              {descriptionError && (
                <p className="text-red-500">{descriptionError}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <input
                className="my-4"
                name="file"
                accept="image/*"
                onChange={fileHandleChange}
                type="file"
              />
            </div>
            <div className="mb-3">
              <img src={selectedFile} alt="" />
            </div>
          </div>

          {formValues.map((element, index) => (
            <>
              <div key={index} className="flex mb-2 gap-4">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Service Type
                  </label>
                  <input
                    className="appearance-none block w-full text-black border-2 border-blue-600  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                    type="text"
                    onChange={(e) => handleChange(index, e)}
                    name="name"
                    value={element.name}
                    autoComplete="off"
                  />
                  {element?.nameError && (
                    <p className="text-red-500">{element?.nameError}</p>
                  )}
                </div>

                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    for="grid-city"
                  >
                    Service Price
                  </label>
                  <input
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
                    type="number"
                    name="price"
                    min={0}
                    onChange={(e) => handleChange(index, e)}
                    value={element.price}
                    autoComplete="off"
                  />
                  {element?.priceError && (
                    <p className="text-red-500">{element?.priceError}</p>
                  )}
                </div>
              </div>

              <div className="w-full py-4">
                <label
                  className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                  for="description"
                >
                  Service Description
                </label>
                <textarea
                  className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-blue-600 resize-none"
                  name="description"
                  onChange={(e) => handleChange(index, e)}
                  rows="5"
                  type="text"
                  value={element.description}
                  autoComplete="off"
                />
                {element?.descriptionError && (
                  <p className="text-red-500">{element?.descriptionError}</p>
                )}
              </div>
              <div className="flex my-4 gap-4 ">
                <button
                  className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded"
                  type="button"
                  onClick={() => addFormFields()}
                >
                  Add
                </button>
                {index ? (
                  <button
                    type="button"
                    className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                    onClick={() => removeFormFields(index)}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </>
          ))}
          <div className="flex justify-center items-center mt-9">
            <button
              className=" bg-[#FF5B39] text-md hover:bg-green text-white font-bold py-3 px-16 rounded"
              type="submit"
            >
              Add Services
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withApollo()(Services);
