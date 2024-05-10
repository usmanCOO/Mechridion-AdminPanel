import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";

import gql from "graphql-tag";

const ACCOUNTS = gql`
  query accounts($first: ConnectionLimitInt, $offset: Int) {
    accounts(first: $first, offset: $offset) {
      totalCount
      nodes {
        StripeUserInfo {
          planName
          active
          subscriptionDate
        }
        _id
        firstName
        primaryEmailAddress
        isActive
        isDeleted
      }
    }
  }
`;
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useAccount(filter) {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(ACCOUNTS, {
    variables: filter,
    nextFetchPolicy: "network-only",
  });

  const viewer = data?.viewer;
  const totalCount = data?.accounts?.totalCount;
  useEffect(() => {
    refetch();
  }, [authToken]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  const accountData = data?.accounts?.nodes;

  return [accountData, loading, refetch, totalCount];
}
