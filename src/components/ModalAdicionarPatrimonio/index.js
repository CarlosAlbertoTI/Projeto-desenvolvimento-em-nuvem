import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import httpService from "../../service/http";
import axios from 'axios'

const { TextArea } = Input;

const ModalAdicionarPatrimonio = ({ open, handleOk, handleCancel }, key) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const formData = new FormData();

  const handleSuccessForm = async () => {
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setLoading(true)
    let handleAddPatrimonioRequest;
    try {
      handleAddPatrimonioRequest = await httpService.post("/bem", {
        nome: "teste",
        localizacao: "nome",
        codpatrimonio: "string",
        usuarioid: userData.codigoUsuario,
      });
    } catch (error) {
      message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
      );

      return;
    }
    //     try {
    //       await axios.put("44.205.231.97/bem/addfiles?id=39"
    //         // await httpService.put(
    //         // `/bem/addfiles?id=${handleAddPatrimonioRequest.data.idBem}`
    //         // `/bem/addfiles?id=39`
    //         , formData,
    //       {
    //         headers: {
    //           "Content-Type": `multipart/form-data`,
    //         },
    //       }
    //       );
    //     } catch (error) {
    //   message.error(
    //     "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
    //   );
    //   return;
    // }
    setLoading(false)
    handleCancel()
    // console.info("Adicionando Patrimonio ao usuario");
    // console.info(value)
    // fileList.forEach((file) => {
    //   formData.append('files[]', file);
    // });
    // setUploading(true); // You can use any AJAX library you like

    // try {
    //   await httpService.put(`/bem/addfiles?id=${bemId}`, formData,)
    // } catch (error) {
    //   message.error('upload failed.');
    //   setUploading(false);
    //   return;
    // }
    // setFileList([]);
    // message.success('upload successfully.');
    // setUploading(false);
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
