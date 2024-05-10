import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_STRIPE_CUSTOMER = gql`
  mutation updateStripeCustomerMutation($input: updateStripeCustomerInput) {
    updateStripeCustomer(input: $input) {
      id
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useUpdateStripeCustomer() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [updateStripeCustomerFunction, { data, loading }] = useMutation(
    UPDATE_STRIPE_CUSTOMER
  );

  return [updateStripeCustomerFunction, loading];
}
