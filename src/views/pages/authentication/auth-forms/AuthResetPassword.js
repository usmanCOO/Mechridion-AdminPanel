import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { strengthColor, strengthIndicator } from "utils/password-strength";
import useUpdatePasswordWithOtp from "hooks/auth/useUpdatePasswordWithOtp";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [updatePassword, loadingUpdatePassword] = useUpdatePasswordWithOtp();
  // const [createUser, loadingCreateUser] = useCreateUser();
  const theme = useTheme();
  // const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        ></Grid>
      </Grid>

      <Formik
        initialValues={{
          password: "",
          confirmpassword: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required("Password is required"),
          confirmpassword: Yup.string()
            .required("Enter password again")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        })}
        onSubmit={async (data) => {
          const email = searchParams.get("email");
          const otp = searchParams.get("otp");
          try {
            const result = await updatePassword({
              variables: {
                email: email,
                newPassword: data?.password,
                otp: otp,
              },
            });
            if (result) {
              toast.success("Password Reset Successfully");
              navigate("/login");
            }
          } catch (err) {
            toast.error(err.message);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                // type={showPassword ? "text" : "password"}
                type="password"
                value={values.password}
                name="password"
                label="Password"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton
                //       aria-label="toggle password visibility"
                //       onClick={handleClickShowPassword}
                //       onMouseDown={handleMouseDownPassword}
                //       edge="end"
                //       size="large"
                //     >
                //       {showPassword ? <Visibility /> : <VisibilityOff />}
                //     </IconButton>
                //   </InputAdornment>
                // }
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-register"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-register">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? "text" : "password"}
                value={values.confirmpassword}
                name="confirmpassword"
                label="Confirm Password"
                autoComplete="off"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{}}
              />
              {touched.confirmpassword && errors.confirmpassword && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-pass-register"
                >
                  {errors.confirmpassword}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <button
                className="w-full h-10 text-white bg-[#FF5B39] font-bold"
                // type="submit"
              >
                Submit
              </button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseRegister;
