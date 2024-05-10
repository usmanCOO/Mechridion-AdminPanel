import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import createLoginMutation from "./createLogin.gql";

import gql from "graphql-tag";

const CREATE_LOGIN = gql`
  mutation authenticate(
    $serviceName: String!
    $email: String
    $password: String
  ) {
    authenticate(
      serviceName: $serviceName
      params: { password: $password, user: { email: $email } }
    ) {
      tokens {
        accessToken
        refreshToken
      }
      user {
        id
        firstName
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCreateLogin() {
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const [createLoginFunction, { data, loading }] = useMutation(CREATE_LOGIN);

  // const res = useMutation(createLoginMutation);

  // console.log("response is ", res);

  return [createLoginFunction, loading];
}
