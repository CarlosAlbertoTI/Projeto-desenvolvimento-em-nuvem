import { Col, Row, Menu, Drawer, Button } from "antd";
import React, { useState } from "react";
import { AlignLeftOutlined } from '@ant-design/icons'

import "./style.css";

// const items = [
//   { label: "Home", key: "1" }, // remember to pass the key prop
//   { label: "Patrimonios", key: "2" }, // remember to pass the key prop
//   { label: "Adicionar Patrimonio", key: "3" }, // remember to pass the key prop
//   { label: "Login", key: "4" }, // which is required
// ];

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen((oldValue) => !oldValue);
  };

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
            {/* <Menu items={items} mode="horizontal" /> */}
          </div>
        </div>
      </Col>
    </Row >
  );
};

export default HeaderComponent;
