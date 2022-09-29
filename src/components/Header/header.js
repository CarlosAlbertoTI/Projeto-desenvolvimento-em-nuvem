import { Col, Row, Drawer, Button } from "antd";
import React, { useState } from "react";
import { AlignLeftOutlined } from '@ant-design/icons'
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const HeaderComponent = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen((oldValue) => !oldValue);
  };

  return (
    <Row>
      {console.info(location.pathname)}
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
              <p>Menu</p>
              <p>Inicio</p>
              <p>Adicionar Patrimonio</p>
              <p>Gerenciar Patrimônios</p>
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
