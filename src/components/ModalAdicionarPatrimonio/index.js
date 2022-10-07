import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import httpService from "../../service/http";
import axios from 'axios'
import { useRef } from "react";

const { TextArea } = Input;

const ModalAdicionarPatrimonio = ({ open, handleOk, handleCancel }, key) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();
  const formref = useRef(null);

  const handleSuccessForm = async (values) => {
    
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    setLoading(true)
    let response;
    try {
      response = await httpService.post("/bem", {
        nome: values.nome,
        localizacao: values.descricao,
        codpatrimonio: "string",
        usuarioid: userData.codigoUsuario,
      });
    } catch (error) {
      message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
      );

      return;
    }
    if(fileList != ""){
      try {
        await httpService.put("/bem/addfiles?id=" + response.data.idBem
          , formData,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
        );
      } catch (error) {
    message.error(
      "Nao foi possível inserir o arquivo do bem, por favor tente mais tarde!"
    );
    return;
  }
    }

      
  

    setLoading(false)
    handleCancel()
    
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
          ref={formref}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
                      }}
          onFinish= {handleSuccessForm}
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
