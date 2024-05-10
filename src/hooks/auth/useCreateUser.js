import { useEffect } from "react";
import { useMutation } from "@apollo/client";

import createUserMutation from "./createUser.gql";

import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $phone: String!
    $email: String
    $password: String
    $UserRole: UserRoleValue
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        email: $email
        password: $password
        UserRole: $UserRole
      }
    ) {
      userId
      loginResult {
        tokens {
          refreshToken
          accessToken
        }
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCreateUser() {
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const [createUserFunction, { data, loading }] = useMutation(CREATE_USER);

  // const res = useMutation(createUserMutation);

  // console.log("response is ", res);

  return [createUserFunction, loading];
}
