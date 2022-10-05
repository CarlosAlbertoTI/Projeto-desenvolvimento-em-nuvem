import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    message
} from 'antd';
import httpService from "../../service/http";

const ModalEditarUsuario = ({ open, handleOk, handleCancel, info }, key) => {
    const [loading, setLoading] = useState(false);

    const handleEditarUsuario = async (values) => {
        const { username, email, password, repete_password } = values
        if (!email.includes("@")) return message.error('Email não valido!');
        if (!(password === repete_password)) return message.error('Senhas não estão iguais');
        if (password.length < 5) return message.error('Senha precisa ter pelo menos 5 caracteres');

        try {
            await httpService.put("/user", { name: username, email, senha: password, id: info.codigoUsuario, identificacao: username })
        } catch (error) {
            message.error("Houve um erro ao tentar editar este usuário, por favor tente novamente!")
            return;
        }
        message.success("Usuário editado com sucesso")
        handleOk()
    };

    return (
        <>
            <Modal
                title="Edite dados deste usuário"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >

                <Form
                    className="formContainer"
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ ...info, username: info.nome }}
                    onFinish={handleEditarUsuario}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Nome"
                        name="username"
                        rules={[
                            { required: true, message: "Campo não pode ser nulo!" },
                        ]}
                    >
                        <Input defaultValue={info.name} />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Campo não pode ser nulo!" },
                        ]}
                    >
                        <Input value={info.email} />
                    </Form.Item>
                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[
                            { required: true, message: "Campo não pode ser nulo!" },
                        ]}
                    >
                        <Input.Password value={info.password} />
                    </Form.Item>
                    <Form.Item
                        label="Repita a senha"
                        name="repete_password"
                        rules={[
                            { required: true, message: "Campo não pode ser nulo!" },
                        ]}
                    >
                        <Input.Password value={info.password} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Atualizar Dados
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalEditarUsuario;