import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://xcbxplrkoevtwqxejlia.hasura.ap-south-1.nhost.run/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'uiA&hRzI*5Dtzt*npQw,x*+iJS3#JbUi'
  },
  cache: new InMemoryCache(),
});
