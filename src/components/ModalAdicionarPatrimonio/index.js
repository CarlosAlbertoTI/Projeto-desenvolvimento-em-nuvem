import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import httpService from "../../service/http";

const { TextArea } = Input;
const { Dragger } = Upload;

const ModalAdicionarPatrimonio = ({ open, handleOk, handleCancel }, key) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true); // You can use any AJAX library you like

    try {
      await httpService.put("/bem/addfiles", formData, {
        headers: {

        }
      })
    } catch (error) {
      message.error('upload failed.');
      return;
    }
    setFileList([]);
    message.success('upload successfully.');
    // fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     setFileList([]);
    //     message.success('upload successfully.');
    //   })
    //   .catch(() => {
    //     message.error('upload failed.');
    //   })
    //   .finally(() => {
    //     setUploading(false);
    //   });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };


  const handleSuccessForm = (value) => {
    setLoading(true);
    handleUpload();
    handleOk();
    setLoading(false);
  };

  return (
    <>
      <Modal
        title="Dados do novo patrimonio"
        open={open}
        onOk={handleOk}
        ok
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onFinish={() => { handleSuccessForm() }}
        >
          <Form.Item
            name="files"
            rules={[{ required: false, message: "Campo não pode ficar vazio" }]}
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="nome"
            label="Nome do patrimonio"
            rules={[{ required: true, message: "Campo não pode ficar vazio" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: "Campo não pode ficar vazio" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 20 }}>
            <Button type="primary" loading={loading} htmlType="submit">
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAdicionarPatrimonio;
