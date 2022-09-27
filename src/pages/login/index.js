import { useState } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { Card, Col, Row, Switch, Form, Input, Checkbox, Button } from "antd";
import "./index.css";

const Login = () => {
  const [switchControl, setSwitchControl] = useState(false);

  const handleSwitchControl = () => setSwitchControl((oldValue) => !oldValue);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <LayoutComponent>
      <Row>
        <Col flex="auto"></Col>
        <Col span={20} offset={0}
          style=
          {{
            marginTop: "10vh",
            marginBottom: "10vh",
            height: "72vh",
            display: "flex",
            justifyContent: "center",
          }}
          >
          <Card
            title={!switchControl ? "Cadastra-se" : "Faça seu Login"}
            className="cardContainer"
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            extra={
              <Switch
                style={{ width: "110px" }}
                checkedChildren="Login"
                unCheckedChildren="Se Registrar"
                checked={switchControl}
                onClick={handleSwitchControl}
              />
            }
          >
            {switchControl && (
              <Form
                className="formContainer"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{
                  marginTop: "40px",
                }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Entrar
                  </Button>
                </Form.Item>
              </Form>
            )}

            {!switchControl && (
              <Form
                className="formContainer"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Cadastrar
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>
        <Col flex="auto"></Col>
      </Row>
    </LayoutComponent>
  );
};

export default Login;
