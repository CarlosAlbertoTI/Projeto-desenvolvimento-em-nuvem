import { Layout } from 'antd';
import React from 'react';

import HeaderComponent from '../Header/header';
const { Content } = Layout;
const LayoutComponent = ({ children }) => {

    return (
        <Layout>
            <HeaderComponent />
            <Content style={{ height: '100vh' }}>{children}</Content>
        </Layout>
    )
}

export default LayoutComponent