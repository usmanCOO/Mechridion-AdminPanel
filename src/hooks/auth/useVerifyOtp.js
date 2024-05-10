import { useMutation } from "@apollo/client";

// import verifyOtp from './verifyOtp.gql'

import gql from "graphql-tag";

const VERIFY_OTP = gql`
  mutation verifyOtp($email: String!, $otp: String!) {
    verifyOtp(email: $email, otp: $otp)
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useVerifyOtp() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [verifyOtpFunction, { data, loading }] = useMutation(VERIFY_OTP);

  return [verifyOtpFunction, loading];
}
