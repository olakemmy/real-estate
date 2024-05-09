import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "./store";

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PROD_URI
    : process.env.NEXT_PUBLIC_DEV_URI,
});

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.user.token;


  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
