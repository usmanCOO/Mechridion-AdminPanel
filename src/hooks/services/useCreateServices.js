import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import createService from "./createServices.gql";

const CREATE_SERVICES = gql`
  mutation createServiceMutation($input: CreateServiceInput) {
    createService(input: $input) {
      _id
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useCreateServices() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [createServicesFunction, { data, loading }] =
    useMutation(CREATE_SERVICES);

  return [createServicesFunction, loading];
}
