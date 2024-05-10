import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";

import gql from "graphql-tag";

const RETRIEVE_STIPE_CUSTOMER_ID = gql`
  query getretrieveStripeCustomerQuery($id: String!) {
    retrieveStripeCustomer(id: $id) {
      id
      name
      email
      description
      address {
        line1
        line2
        city
        state
        postal_code
        country
      }
      balance
      created
      currency
      default_source
      invoice_prefix
      phone
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */

export default function useRetrieveStripe(id) {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(RETRIEVE_STIPE_CUSTOMER_ID, {
    variables: {
      id,
    },
  });

  const viewer = data?.viewer;

  useEffect(() => {
    if (data) {
      return;
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [authToken, id]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  return [data, loading, refetch];
}
