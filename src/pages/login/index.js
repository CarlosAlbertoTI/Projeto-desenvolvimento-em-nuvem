import { useState } from "react";
import LayoutComponent from "../../components/Layout/layout";
import { Card, Col, Row, Switch, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import httpService from "../../service/http";
import "./index.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [switchControl, setSwitchControl] = useState(false);
  const navigate = useNavigate();
  const handleSwitchControl = () => setSwitchControl((oldValue) => !oldValue);

  const loginService = async (value) => {
    setLoading(true);
    const { username, password } = value;
    setLoading(true);
    let result;
    try {
      result = await httpService.get("/user/me", {
        headers: { Authorization: "Basic " + btoa(username + ":" + password) },
      });
    } catch (error) {
      setLoading(false);
      message.error("Email e senha não valido!");
      return;
    }
    const { role } = result.data;
    localStorage.setItem("user", JSON.stringify({ ...result.data, "senha": password }));
    switch (role) {
      case "USER":
        message.success(`Seja bem vindo !`);
        navigate("/home");
        break;
      case "ROOT":
        message.success(`Seja bem vindo !`);
        navigate("/admin");
        break;

      default:
        message.error("Erro no login, por favor tente mais tarde");
        break;
    }
    // message.success(`Seja bem vindo !`)
    // return navigate('/home')
  };

  const loginServiceFailure = (errorInfo) => {
    return message.error("Preencha todos os campos");
  };

  const cadastroService = async ({ username, email, password }) => {
    setLoading(true);
    if (!email.includes("@")) {
      setLoading(false);
      return message.error("Email não valido!");
    }
    if (password.length < 5) {
      setLoading(false);
      return message.error("Senha precisa ter pelo menos 5 caracteres");
    }
    const newUser = {
      email: email,
      identificacao: username,
      name: username,
      senha: password,
    };
    let result;
    try {
      result = await httpService.post("/user", newUser, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      setLoading(false);
      message.error(
        "Não foi possivel se cadastrar no sistema, por favor tente mais tarde"
      );
      return;
    }
    setLoading(false);
    setSwitchControl((oldValue) => !oldValue);
    // return navigate('/home')
  };

  const cadastroServiceFailure = () => {
    return message.error("Preencha todos os campos");
  };

  return (
    <LayoutComponent>
      <Row>
        <Col flex="auto"></Col>
        <Col
          span={20}
          offset={0}
          style={{
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
                onFinish={loginService}
                onFinishFailed={loginServiceFailure}
                autoComplete="off"
                style={{
                  marginTop: "40px",
                }}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Campo de email não pode ficar vazio!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Campo de senha não pode ficar vazio!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button loading={loading} type="primary" htmlType="submit">
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
                onFinish={cadastroService}
                onFinishFailed={cadastroServiceFailure}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Campo de nome não pode ficar vazio!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Campo de email não pode ficar vazio!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Campo de senha não pode ficar vazio!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button loading={loading} type="primary" htmlType="submit">
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
