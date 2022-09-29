import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    message
} from 'antd';

const ModalAdicionarUsuario = ({ open, handleOk, handleCancel }) => {

    const handleSucessForm = (values) => {
        const { username, email, password } = values
        if (!email.includes("@")) return message.error('Email não valido!');
        if (password.length < 5) return message.error('Senha precisa ter pelo menos 5 caracteres');
        try {
            //request 
        } catch (error) {
            return message.error("Erro ao adicionar um usuario, por favor tente mais tarde!")
        }
        message.success("Usuário criado com sucesso!")
        // console.log("Success:", values);
        handleOk()
    };



    const [confirmLoading, setConfirmLoading] = useState(false);

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
                        <Button type="primary" htmlType="submit">
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAdicionarUsuario;