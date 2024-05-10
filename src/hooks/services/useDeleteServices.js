import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import deleteService from "./deleteServices.gql";

const DELETE_SERVICES = gql`
  mutation deleteServiceMutation($id: ID!) {
    deleteService(id: $id)
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

  const [deleteServicesFunction, { data, loading }] =
    useMutation(DELETE_SERVICES);

  return [deleteServicesFunction, loading];
}
