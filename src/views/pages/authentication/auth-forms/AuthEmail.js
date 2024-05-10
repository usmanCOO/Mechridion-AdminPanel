import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import getAccountsHandler from "lib/accountsServer";
import hashPassword from "lib/utils/hashPassword";
import { toast } from "react-toastify";
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "hooks/useScriptRef";
import useResetPasswordWithOtp from "hooks/auth/useResetPasswordWithOtp";

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const [resetPassword, loadingResetPasswordWithOtp] =
    useResetPasswordWithOtp();
  // const { passwordClient } = getAccountsHandler();

  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);

  const googleHandler = async () => {
    console.error("Login");
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "info@codedthemes.com",

          // submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
        })}
        onSubmit={async (data, { setErrors, setStatus, setSubmitting }) => {
          // try {
          //   if (scriptedRef.current) {
          //     setStatus({ success: true });
          //     setSubmitting(false);
          //   }
          // } catch (err) {
          //   console.error(err);
          //   if (scriptedRef.current) {
          //     setStatus({ success: false });
          //     setErrors({ submit: err.message });
          //     setSubmitting(false);
          //   }
          // }

          try {
            const result = await resetPassword({
              variables: {
                email: data?.email,
              },
            });
            if (result) {
              // localStorage.setItem("email", data?.email ?? "");
              toast.success("Verification Email sent");
              navigate(`/otp`, { state: { email: data?.email } });

              // router.push('/some/route', { query: { param: 'value' } })
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
              error={Boolean(touched.email && errors.email)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                autoComplete="off"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
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
                type="submit"
              >
                Next
              </button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
