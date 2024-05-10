import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_STRIPE_CUSTOMER = gql`
  mutation createStripeCustomerMutation($input: StripeInput) {
    createStripeCustomer(input: $input) {
      id
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCreateStripeCustomer() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [createStripeCustomerFunction, { data, loading }] = useMutation(
    CREATE_STRIPE_CUSTOMER
  );

  return [createStripeCustomerFunction, loading];
}
