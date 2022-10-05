import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    message
} from 'antd';
import httpService from "../../service/http";


const ModalAdicionarUsuario = ({ open, handleOk, handleCancel }, key) => {
    const [loading, setLoading] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleSucessForm = async (values) => {
        const { username, password, email } = values
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
        handleOk()
    };

    return (
        <>
            <Modal
                title="Adicionar novo usuário"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                footer={[]}
            >
                <Form
                    className="formContainer"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSucessForm}
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
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAdicionarUsuario;