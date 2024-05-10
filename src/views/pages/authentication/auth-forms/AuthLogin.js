import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import getAccountsHandler from "lib/accountsServer";
// import hashPassword from "lib/utils/hashPassword";
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
import { Link } from "react-router-dom";

// project imports
import useScriptRef from "hooks/useScriptRef";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useCreateLogin from "hooks/auth/useCreateLogin";

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
  // const { passwordClient } = getAccountsHandler();
  const [createLogin, loadingCreateLogin] = useCreateLogin();
  const navigate = useNavigate();
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
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
            <Typography sx={{ color: "white" }}>
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: "info@codedthemes.com",
          password: "123456",
          // submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
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
            const result = await createLogin({
              variables: {
                serviceName: "password",
                email: data?.email,
                password: data?.password,
                //   params: {
                //     password: data?.password,
                //     user: {
                //       email: data?.email,
                //     },
                //   },
                // },
              },
            });

            if (result) {
              localStorage.setItem(
                "accounts:accessToken",
                result?.data?.authenticate?.tokens?.accessToken
              );

              localStorage.setItem(
                "firstname",
                result?.data?.authenticate?.user?.firstName
              );

              localStorage.setItem(
                "accounts:refreshToken",
                result?.data?.authenticate?.tokens?.refreshToken
              );
              toast.success("Sign In Successfully");
              navigate("/");
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
                name="email"
                autoComplete="off"
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

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                autoComplete="off"
                onChange={handleChange}
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    style={{
                      color: "white",
                    }}
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    name="checked"
                    // color="primary"
                    // sx={{ color: "white" }}
                  />
                }
                label="Remember me"
              />

              <Typography
                // variant="subtitle1"
                component={Link}
                to="/email"
                color="secondary"
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "#FF5B39",
                }}
              >
                Forgot Password?
              </Typography>
            </Stack>
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
                Sign In
              </button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
