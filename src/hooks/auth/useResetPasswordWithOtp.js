import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import resetPasswordWithOtp from "./resetPasswordWithOtp.gql";

import gql from "graphql-tag";

const RESET_EMAIL = gql`
  mutation ResetPasswordWithOTP($email: String!) {
    ResetPasswordWithOTP(email: $email)
  }
`;
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useResetPasswordWithOtp() {
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const [resetPasswordWithOtpFunction, { data, loading }] =
    useMutation(RESET_EMAIL);

  return [resetPasswordWithOtpFunction, loading];
}
