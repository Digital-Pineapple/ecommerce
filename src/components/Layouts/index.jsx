import React from 'react'
import NavBar from './NavBar'
import TabBar from './TabBar'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
            <TabBar />
        </>
    )
}

export default Layout