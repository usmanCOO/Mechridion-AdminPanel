import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import useStores from "hooks/useStores";
import gql from "graphql-tag";

const GET_ALL_VEHICLE_MODEL = gql`
  query getAllVehicleModel($first: ConnectionLimitInt, $offset: Int) {
    getAllVehicleModel(first: $first, offset: $offset) {
      totalCount
      nodes {
        _id
        title
        name
        modelYear
        generationID
        productId
        update
      }
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useGetAllVehicleModel(filter) {
  const { authStore } = useStores();
  const { account, setAccount } = authStore;
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(GET_ALL_VEHICLE_MODEL, {
    variables: filter,
    nextFetchPolicy: "network-only",
  });

  const viewer = data?.viewer;
  const totalCount = data?.getAllVehicleModel?.totalCount;
  useEffect(() => {
    refetch();
  }, [authToken]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setAccount(viewer);
  }, [viewer]);

  return [data, loading, refetch, totalCount];
}
