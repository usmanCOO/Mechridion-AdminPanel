import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_STRIPE_CUSTOMER = gql`
  mutation deleteStripeCustomerMutation($id: ID!) {
    deleteStripeCustomer(id: $id) {
      id
      object
      deleted
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useDeleteServices() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [deleteStripeCustomerFunction, { data, loading }] = useMutation(
    DELETE_STRIPE_CUSTOMER
  );

  return [deleteStripeCustomerFunction, loading];
}
