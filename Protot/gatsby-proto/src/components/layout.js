import React from "react"
import NavBar from "./navbar"
import Head from '../components/head'
import '../scss/bootswatch.scss';
import '../scss/style.scss';

const Layout = props => {
  return (
    <div>
    <Head>
      <title>Verkkokauppa</title>
    </Head>
    {/*<Banner />*/}
    <NavBar />
    
    <div className="main-container">
      <div className="content-container">
        { props.children }  
      </div>
    </div>
    
  </div>
  )
}

export default Layout
