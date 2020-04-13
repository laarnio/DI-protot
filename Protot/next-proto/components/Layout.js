import Head from 'next/head';
import NavBar from './Navbar';
import '../scss/style.scss';
import '../scss/bootswatch.scss';

const Layout = (props) => (
  <div>
    <Head>
      <title>Verkkokauppa</title>
    </Head>

    <NavBar />
    <div className="main-container">
      <div className="content-container">
        { props.children }  
      </div>
    </div>
    
  </div>
)

export default Layout;