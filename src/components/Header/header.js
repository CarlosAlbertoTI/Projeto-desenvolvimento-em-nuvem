import { Col, Row, Drawer, Button, Menu } from "antd";
import React, { useState } from "react";
import { AlignLeftOutlined, HomeOutlined, LogoutOutlined, CommentOutlined } from '@ant-design/icons'
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const HeaderComponent = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen((oldValue) => !oldValue);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('', '3', <Link to="/avaliar"><CommentOutlined /> Avaliar</Link>),
    getItem('', '4', <Link to="/"><LogoutOutlined /> Login</Link>,),
  ];

  const itensAdmin = [
    getItem('', '2', <Link to="/admin"><CommentOutlined /> Admin</Link>),
    getItem('', '3', <Link to="/avaliar"><CommentOutlined /> Avaliar</Link>),
    getItem('', '4', <Link to="/"><LogoutOutlined /> Logout</Link>,),
  ]

  const itensUser = [
    getItem('', '1', <Link to="/home"><HomeOutlined /> Home</Link>),
    getItem('', '3', <Link to="/avaliar"><CommentOutlined /> Avaliar</Link>),
    getItem('', '4', <Link to="/"><LogoutOutlined /> Logout</Link>,),
  ]


  return (
    <Row>
      <Col span={24}>
        <div className="header">
          <div className="mobile-btn-menu">
            <Button type="primary" onClick={showDrawer} icon={<AlignLeftOutlined />}></Button>
          </div>
          {open && (
            <Drawer
              title="Meus Patrimônios"
              placement="left"
              onClose={showDrawer}
              open={open}
            >
              <Menu
                mode="inline"
                items={location.pathname !== '/' ? (location.pathname !== '/admin' ? itensUser : itensAdmin) : items}
              />
            </Drawer>
          )}

          <div className="logo-container">
            <div className="logo">
              <h3>
                Meus Patrimonios
              </h3>
            </div>
          </div>
          <div className="menuContent">
            {location.pathname !== '/' && location.pathname !== '/avaliar' && (
              <Button style={{ width: '100px', marginLeft: '10px', backgroundColor: '#BF6900', color: 'white' }} type="primary"><Link to="/">Sair</Link></Button>
            )}
            {location.pathname !== '/home' && location.pathname !== '/avaliar' && (
              <Button style={{ width: '100px', marginLeft: '10px', backgroundColor: '#BF6900', color: 'white' }} type="primary"><Link to="/avaliar">Avaliar</Link></Button>
            )}
            {location.pathname !== '/' && location.pathname !== '/admin' && location.pathname !== '/home' && (
              <Button style={{ width: '100px', marginLeft: '10px', backgroundColor: '#BF6900', color: 'white' }} type="primary"><Link to="/">Login</Link></Button>
            )}
          </div>
        </div>
      </Col>
    </Row >
  );
};

export default HeaderComponent;
