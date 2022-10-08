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
    //! Para testes
    //! return setTimeout(() => {
    //!   message.info(`Seja Bem vindo ${value.username}`, 2);
    //!   setLoading(false)
    //!   return navigate('/home')
    //! }, 5000)

    const { username, password } = value;
    let result;
    try {
      result = await httpService.get("/user/me", {
        headers: { Authorization: "Basic " + btoa(`${username}:${password}`) },
      });
    } catch (error) {
      setLoading(false);
      message.error("Email e senha não valido!", 1);
      return;
    }
    const { role } = result.data;
    localStorage.setItem("user", JSON.stringify({ ...result.data, "senha": password }));
    switch (role) {
      case "USER":
        message.success(`Seja bem vinda(o) ${username}!`, 2)
        navigate("/home");
        break;
      case "ROOT":
        message.success(`Seja bem vinda(o) ${username}!`, 2)
        navigate("/admin");
        break;

      default:
        message.error("Erro no login, por favor tente mais tarde", 5);
        break;
    }
    setLoading(false)
  };

  const loginServiceFailure = (errorInfo) => {
    return message.error("Preencha todos os campos", 1);
  };

  const cadastroService = async ({ username, email, password }) => {

    //! Para testes
    //! setLoading(true);
    //! setTimeout(() => {
    //!   setSwitchControl((oldValue) => !oldValue);
    //!   setLoading(false)
    //! }, 5000)

    if (!email.includes("@")) {
      setLoading(false);
      return message.error("Email não valido!", 2);
    }
    if (password.length < 5) {
      setLoading(false);
      return message.error("Senha precisa ter pelo menos 5 caracteres", 2);
    }
    const newUser = {
      email: email,
      identificacao: username,
      name: username,
      senha: password,
    };

    try {
      await httpService.post("/user", newUser, {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      setLoading(false);
      message.error("Não foi possivel se cadastrar no sistema, por favor tente mais tarde", 5);
      return;
    }
    setLoading(false);
    setSwitchControl((oldValue) => !oldValue);
  };

  const cadastroServiceFailure = () => {
    return message.error("Preencha todos os campos", 1);
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
                checked={!switchControl}
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
