import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, useMediaQuery } from "@mui/material";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
// project imports

import Google from "assets/images/icons/social-google.svg";
import OtpInput from "react-otp-input";
import useVerifyOtp from "hooks/auth/useVerifyOtp";
// import { Email } from "@mui/icons-material";

// ============================|| FIREBASE - LOGIN ||============================ //

const OTPForm = ({ ...others }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [Otpdata, loadingOtp, refetchOtp] = useVerifyOtp();
  const [otp, setOtp] = useState("");
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOTPChange = (value) => {
    setOtp(value);
  };

  const [searchParams] = useSearchParams();

  const OtpEmail = async (e) => {
    // const email = searchParams.get("email");
    const email = location.state.email;

    try {
      e.preventDefault();
      const result = await Otpdata({
        variables: {
          email: email,
          otp: otp,
        },
      });
      if (result) {
        toast.success("Otp code successfully ");
        navigate(`/resetpassword?email=${email}&&otp=${otp}`);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={OtpEmail}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
          ></Grid>
        </Grid>

        <div className="flex justify-center items-center">
          <OtpInput
            separator={<span className="px-3 "></span>}
            isInputNum={true}
            containerStyle={{ marginTop: "20px", marginBottom: "20px" }}
            inputStyle={{
              border: "1px solid #FF4B2A",
              borderRadius: "6px",
              width: "50px",
              height: "42px",
              fontSize: "18px",
              backgroundColor: "#222222",
              color: "white",
              fontWeight: "600",
            }}
            focusStyle={{
              border: "1px solid #FF4B2A",
              outline: "none",
            }}
            value={otp}
            onChange={handleOTPChange}
            numInputs={6}
          />
        </div>

        <button className="w-full h-10 text-white bg-[#FF5B39] font-bold px-32">
          Next
        </button>
      </form>
    </>
  );
};

export default OTPForm;
