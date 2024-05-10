import { useEffect } from "react";
import { useMutation } from "@apollo/client";

// import updatePasswordWithOtp from './updatePasswordWithOtp.gql'

import gql from "graphql-tag";

const UPDATE_PASSWORD = gql`
  mutation updatePasswordWithOTP(
    $otp: String!
    $newPassword: String!
    $email: String!
  ) {
    updatePasswordWithOTP(otp: $otp, newPassword: $newPassword, email: $email)
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useUpdatePasswordWithOtp() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [updatePasswordWithOtpFunction, { data, loading }] =
    useMutation(UPDATE_PASSWORD);

  return [updatePasswordWithOtpFunction, loading];
}
