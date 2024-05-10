import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
// import viewerQuery from "./viewer.gql";
import gql from "graphql-tag";

const VIEWER = gql`
  query viewer {
    viewer {
      _id

      # addressBook {
      #   edges {
      #     node {
      #       _id
      #       address1
      #       address2
      #       city
      #       company
      #       country
      #       fullName
      #       isBillingDefault
      #       isCommercial
      #       isShippingDefault
      #       phone
      #       postal
      #       region
      #     }
      #   }
      # }
      firstName
      lastName
      emailRecords {
        address
      }
      name
      picture
      primaryEmailAddress
    }
  }
`;
/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useViewer() {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(VIEWER);

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

  return [account, loading, refetch];
}
