import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
// import getServiceByID from "./getServiceByID.gql";

import gql from "graphql-tag";

const GET_SERVICES_ID = gql`
  query getServiceByIDQuery($id: ID!) {
    getServiceByID(id: $id) {
      name
      _id
      description
      imageLink
      options {
        name
        price
        description
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */

export default function useGetServiceByID(id) {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(GET_SERVICES_ID, {
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
