import React from 'react'
import { Col, Row, Image, Card } from 'antd';
import pic from '../../assets/dude-sitting-pic.png'

const Layout = ({ children, type }: { children: React.ReactNode | React.ReactNode[], type?: 'auth' | 'app' }) => {
  return <Card style={{ height: 'calc(99vh - 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
    <Row gutter={[100, 20]}>
      <Col span={12}>
        <Image
          width={480}
          height={680}
          preview={false}
          src={pic}
        />
      </Col>
      <Col span={12}>
        {children}
      </Col>
    </Row>
  </Card>
}
export default Layout