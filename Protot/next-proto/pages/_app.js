import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import withApollo from '../lib/withApollo';
import Layout from '../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);