import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import httpService from "../../service/http";

const ModalAdicionarPatrimonio = ({ open, handleOk, handleCancel }, key) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  
  const handleSuccessForm = async (value) => {
    fileList.forEach(file => {
      formData.append('file', file);
    });

    setLoading(true)
    let handleAddPatrimonioRequest;
    try {

      handleAddPatrimonioRequest = await httpService.post("/bem", {
        nome: value.nome,
        localizacao: value.descricao,
        usuarioid: userData.codigoUsuario,
      });

      await httpService.put(`/bem/addfiles?id=${handleAddPatrimonioRequest.data.idBem}`
        , formData,
        {
          headers: {
            "Authorization": "Basic " + btoa(`${userData.nome}:${userData.senha}`),
            "Content-Type": `multipart/form-data`,
            "Content-Disposition": "file",
            "Content-Transfer-Encoding": "binary",
            "type": "formData"
          },
        }
      );

    } catch (error) {
      message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!", 5);
    }
    setLoading(false)
    handleCancel()
    return
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



  // const handleSuccessForm = (value) => {
  //   setLoading(true);
  //   handleOk(formData);
  //   setLoading(false);
  // };

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
          onFinish={handleSuccessForm}
        >
          <Form.Item
            name="files"
            label="Envie seu arquivo aqui. (Apenas em formato pdf, jpg e png)"
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
            label="Localização"
            rules={[{ required: true, message: "Campo não pode ficar vazio" }]}
          >
            <Input />
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
