import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';
//import { setContext } from '@apollo/client/link/context';

//Le decimos a donde se conecta
const HttpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
});

//Le agregamos un nuevo header
const authLink = setContext((_, {headers}) => {

    //Leer el storage almacenado
    const token = localStorage.getItem('token');

    return{
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

//Lo conectamos a Apollo Client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(HttpLink)
});

export default client;