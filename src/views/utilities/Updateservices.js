import React, { useState, useEffect } from "react";
import { withApollo } from "lib/apollo/withApollo";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUpdateServices from "hooks/services/useUpdateServices";
import useGetServicesId from "hooks/services/useGetServicesByID";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const UpdateServices = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [updateService, loadingUpdateService] = useUpdateServices();

  const [data, loading, refetch] = useGetServicesId(id);

  const initialName = data?.getServiceByID?.name;
  const [uname, setName] = useState(initialName);
  const [description, setDescription] = useState(
    data?.getServiceByID?.description
  );
  const [formValues, setFormValues] = useState([]);

  const [selectedFile, setSelectedFile] = useState(
    data?.getServiceByID?.imageLink
  );

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
    if (e.target.name === "price") {
      newFormValues[i][e.target.name] = parseFloat(e.target.value);
    } else {
      newFormValues[i][e.target.name] = e.target.value;
    }
    setFormValues(newFormValues);
  };

  const fileHandleChange = async (event) => {
    try {
      const file = event.target.files[0];

      // Check if the selected file is an image or allowed type
      if (file && file.type.startsWith("image/")) {
        const formData = new FormData();

        formData.append("isMulti", "false");
        formData.append("uploadPath", "/testupload");
        formData.append("photos", event.target.files[0]);

        const requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };
        let result = await fetch(process.env.REACT_APP_IMAGE, requestOptions);
        result = await result.json();

        if (result) {
          setSelectedFile(result?.data[0]?.url[2].Location);
          toast("Image Uploaded Successfully");
        }
      } else {
        setSelectedFile("");
        toast("Please choose an image file");
      }
    } catch (error) {
      toast(error.message);
    }
  };

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = searchParams.get("id");

    try {
      const result = await updateService({
        variables: {
          input: {
            shopId: "cmVhY3Rpb24vc2hvcDpwR1J5Wm1ibTZCcHBMOEVRRg==",
            serviceId: id,
            service: {
              name: uname,
              description: description,
              imageLink: selectedFile,
              options: formValues,
            },
          },
        },
      });

      if (result) {
        toast.success("Service is Updated Successfully");
        navigate("/servicesdetail");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (data) {
      setName(initialName);
      setDescription(data?.getServiceByID?.description);
      setSelectedFile(data?.getServiceByID?.imageLink);
      setFormValues(
        data?.getServiceByID.options.map((option) => ({
          ...option,
          name: option?.name,
          price: option?.price,
          description: option.description,
        }))
      );
    }
  }, [data]);

  return (
    <div>
      <p className="text-white text-4xl font-bold flex justify-center items-center">
        Update Service
      </p>

      <div className="flex justify-center items-center">
        {loading ? (
          <CircularProgress color="success" />
        ) : (
          <form onSubmit={handleSubmit} className="w-full mx-[360px] ">
            <div className="flex mb-6 ">
              <div className="w-full md:w-full  mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                  for="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full  text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                  type="text"
                  value={uname}
                  name={uname}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex flex-wrap  mb-6">
              <div className="w-full ">
                <label
                  className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                  for="description"
                >
                  Description
                </label>
                <textarea
                  className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600 resize-none"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="6"
                  type="text"
                  autoComplete="off"
                />
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
                  <div className="w-full md:w-1/2  mb-6 md:mb-0">
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
                  </div>

                  <div className="w-full md:w-1/2  mb-6 md:mb-0">
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
                  </div>
                </div>

                <div className="w-full">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2 "
                    for="description"
                  >
                    Service Description
                  </label>
                  <textarea
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 mb-3 leading-tight focus:outline-none focus:border-blue-600 resize-none px-4"
                    name="description"
                    onChange={(e) => handleChange(index, e)}
                    rows="5"
                    type="text"
                    value={element.description}
                    autoComplete="off"
                  />
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
                Update Service
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default withApollo()(UpdateServices);
