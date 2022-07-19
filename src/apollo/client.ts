import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";


const authToken = "my-auth-token"
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/subscriptions",
  options: {
    reconnect: true,
  },
  connectionParams: {
    authToken: authToken,
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

// This allows us to use http for mutations/queries and websocket for subscriptions
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  uri: "http://localhost:8000",
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;