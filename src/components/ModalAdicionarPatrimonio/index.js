import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    Upload,
    message
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Dragger } = Upload;

const ModalAdicionarPatrimonio = ({ open, handleOk, handleCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const props = {
        name: 'file',
        multiple: true,
        action: '',

        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };


    const handleSuccessForm = (value) => {
        console.info(value)
    }



    return (
        <>
            <Modal
                title="Dados do novo patrimonio"
                open={open}
                onOk={handleOk}
                ok
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>
                ]}
            >
                <Form
                    layout="vertical"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                    onFinish={handleSuccessForm}
                >
                    <Form.Item name="files" valuePropName="fileList" rules={[
                        { required: true, message: "Campo não pode ficar vazio" },
                    ]}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item name="nome" label="Nome do patrimonio" rules={[
                        { required: true, message: "Campo não pode ficar vazio" },
                    ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="descricao" label="Descrição" rules={[
                        { required: true, message: "Campo não pode ficar vazio" },
                    ]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 20 }}>
                        <Button type="primary" htmlType="submit" >
                            Adicionar
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalAdicionarPatrimonio;