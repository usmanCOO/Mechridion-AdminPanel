import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import catalogItemsQuery from "./catalogItems.gql";
// import catalogItemsQuery from "../../containers/catalog/catalogItems.gql";

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCatalogItems(input) {
  const authToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accounts:accessToken")
      : undefined;

  const { loading, data, refetch } = useQuery(catalogItemsQuery, {
    variables: { shopId: input },
  });

  const catalogItems = data?.catalogItems?.edges;

  useEffect(() => {
    console.log("incoming input is ", input);
    refetch();
  }, [authToken]);

  return [catalogItems, loading, refetch];
}
