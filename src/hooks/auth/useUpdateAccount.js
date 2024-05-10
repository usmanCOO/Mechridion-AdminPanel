import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
// import updateAccountMutation from './updateAccount.gql'

const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $accountId: ID
    $isDeleted: Boolean
    $isActive: Boolean
  ) {
    updateAccount(
      input: {
        accountId: $accountId
        isDeleted: $isDeleted
        isActive: $isActive
      }
    ) {
      account {
        _id
        firstName
        primaryEmailAddress
        isDeleted
        isActive
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useUpdateAccount() {
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const [updateAccountFunction, { data, loading }] =
    useMutation(UPDATE_ACCOUNT);

  return [updateAccountFunction, loading];
}
