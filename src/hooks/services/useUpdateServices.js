import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_SERVICES = gql`
  mutation updateServiceMutation($input: UpdateServiceInput) {
    updateService(input: $input) {
      _id
    }
  }
`;

/**
 * Gets current viewer's data
 *
 * @returns {Array} the viewer's data
 */
export default function useUpdateServices() {
  // const authToken =
  //   typeof window !== 'undefined' ? window.localStorage.getItem('accounts:accessToken') : undefined

  const [updateServicesFunction, { data, loading }] =
    useMutation(UPDATE_SERVICES);

  return [updateServicesFunction, loading];
}
