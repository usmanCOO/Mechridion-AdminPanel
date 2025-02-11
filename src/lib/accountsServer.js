import { ApolloLink } from "apollo-link";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { AccountsClient } from "@accounts/client";
import { AccountsClientPassword } from "@accounts/client-password";
import { AccountsGraphQLClient } from "@accounts/graphql-client";

const passwordClient = null;
// @ts-ignore: Unreachable code error
let accountsClient = null;

/**
 * Return and caches a copy of passwordClient and accountsClient.
 *
 * @returns {Object} of form { AccountsClientPassword, AccountsClient }
 */
export default function getAccountsHandler() {
  // @ts-ignore: Unreachable code error
  if (passwordClient && accountsClient) {
    return { passwordClient, accountsClient };
  }
  const cache = new InMemoryCache();
  let graphqlUrl;

  if (process.browser) {
    graphqlUrl = process.env.REACT_APP_API_URL;
  } else {
    graphqlUrl = process.env.REACT_APP_API_URL;
  }
  const httpLink = new HttpLink({
    uri: graphqlUrl,
    credentials: "same-origin",
  });

  const throwAwayGraphQLClient = new ApolloClient({
    cache,
    // @ts-ignore: Unreachable code error
    link: ApolloLink.from([httpLink]),
  });

  // Create your transport
  const accountsGraphQL = new AccountsGraphQLClient({
    graphQLClient: throwAwayGraphQLClient,
  });

  // Create the AccountsClient
  accountsClient = new AccountsClient(
    {
      // accountsClient Options
    },
    accountsGraphQL
  );

  return {
    passwordClient: new AccountsClientPassword(accountsClient),
    accountsClient,
  };
}
