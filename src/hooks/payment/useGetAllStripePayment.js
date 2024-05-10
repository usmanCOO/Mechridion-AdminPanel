import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";

import gql from "graphql-tag";

const GET_STRIPE_INFO = gql`
  query {
    accounts(first: 25) {
      edges {
        node {
          _id
          firstName
          # language
          lastName
          # phone
          userId
          StripeUserInfo {
            amount
            active
            planName
            currency
            stripeUserData
          }
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
export default function useGetStripCustomer() {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(GET_STRIPE_INFO);

  const viewer = data?.viewer;
  useEffect(() => {
    refetch();
  }, [authToken]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  const getStripeInfo = data?.accounts;

  return [getStripeInfo, loading, refetch];
}
