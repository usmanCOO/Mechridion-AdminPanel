import React from "react";

import { withApollo } from "lib/apollo/withApollo";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import retriveCustomerStripe from "hooks/payment/useGetStripePaymentByID";

import useUpdateStripeCustomer from "hooks/payment/useUpdateStripeCustomer";

const UpdateCustomerDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, loading, refetch] = retriveCustomerStripe(id);

  const [updateStripeCustomer] = useUpdateStripeCustomer();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(255)
      .required("First Name is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Name can only contain letters."
      ),
    email: Yup.string().email("Invalid email").required("Email is required"),
    description: Yup.string().required("Description is required"),
    phone: Yup.string()
      .max(255)
      .required("Phone is required")
      .matches(
        /^[+\d]+$/,
        "Alphabet,Non Negative and special character not allowed"
      ),
    balance: Yup.number()
      .typeError("Balance must be a number")
      .required("Balance is required"),

    addressline1: Yup.string().max(255).required("Line 1 is required"),
    addressline2: Yup.string().max(255).required("Line 2 is required"),
    country: Yup.string()
      .max(255)
      .required("Country is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "Country can only contain letters."
      ),
    city: Yup.string()
      .max(255)
      .required("City is required")
      .matches(
        /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
        "City can only contain letters."
      ),
    state: Yup.string().max(255).required("State is required"),
    postalcode: Yup.string()
      .max(255)
      .required("Postal Code is required")
      .matches(
        /^[+\d]+$/,
        "Alphabet,Non Negative and special character not allowed"
      ),
  });

  if (!data || loading) {
    return <CircularProgress color="success" />;
  }

  return (
    <div>
      <p className="text-white text-4xl font-bold flex justify-center items-center mb-12">
        Update Customer Detail
      </p>

      <div className="flex justify-center items-center">
        <ToastContainer />
        <Formik
          initialValues={{
            name: data?.retrieveStripeCustomer?.name,
            email: data?.retrieveStripeCustomer?.email,
            description: data?.retrieveStripeCustomer?.description,
            phone: data?.retrieveStripeCustomer?.phone,
            balance: data?.retrieveStripeCustomer?.balance,
            addressline1: data?.retrieveStripeCustomer?.address?.addressline1,
            addressline2: data?.retrieveStripeCustomer?.address?.addressline2,
            city: data?.retrieveStripeCustomer?.address?.city,
            state: data?.retrieveStripeCustomer?.address?.state,
            postalcode: data?.retrieveStripeCustomer?.address?.postalcode,
            country: data?.retrieveStripeCustomer?.address?.country,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            // Handle form submission logic here
            // console.log(values);
            // actions.setSubmitting(false);
            const id = searchParams.get("id");
            try {
              const result = await updateStripeCustomer({
                variables: {
                  input: {
                    id: id,
                    name: values?.name,
                    email: values?.email,
                    description: values?.description,
                    // address: {
                    //   line1: values?.addressline1,
                    //   line2: values?.addressline2,
                    //   city: values?.city,
                    //   state: values?.state,
                    //   postal_code: values?.postal_code,
                    //   country: values?.country,
                    // },
                    balance: values?.balance,
                    phone: values?.phone,
                  },
                },
              });

              if (result) {
                toast("Customer Detail Updated Successfully ");
                navigate("/customerdetail");
              }
            } catch (err) {
              toast(err.message);
            }
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form className="w-full mx-[400px]">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Name
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="name"
                    component="div"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-email"
                  >
                    Email
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="email"
                    component="div"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-phone"
                  >
                    Phone Number
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="phone"
                    component="div"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    balance
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="number"
                    name="balance"
                    min={0}
                    value={values.balance}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="balance"
                    component="div"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-line1"
                  >
                    Address Line 1
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="addressline1"
                    value={values.addressline1}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="addressline1"
                    component="div"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-line1"
                  >
                    Address Line 2
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="addressline2"
                    value={values.addressline2}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="addressline2"
                    component="div"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="country"
                    component="div"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    city
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="city"
                    component="div"
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-postalcode"
                  >
                    Postal Code
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="postalcode"
                    value={values.postalcode}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="postalcode"
                    component="div"
                  />
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    State
                  </label>
                  <Field
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    type="text"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="state"
                    component="div"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-md font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    className="appearance-none block w-full text-black border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-black focus:border-blue-600"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    rows="6"
                  />
                  <ErrorMessage
                    className="text-red-500"
                    name="description"
                    component="div"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center mt-9">
                <button
                  className="bg-green-700 text-md hover:bg-green text-white font-bold py-3 px-16 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default withApollo()(UpdateCustomerDetail);
