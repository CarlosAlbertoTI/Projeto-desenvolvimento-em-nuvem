import React, { useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import httpService from "../../service/http";
const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ModalAlterarDadosPatrimonio = ({
  open,
  handleCancelModal,
  info,
  handleAction
}, key) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      usuarioId: info.usuarioId,
      idBem: info.idBem,
      name: info.name,
      dirImagemBem: info.dirImagemBem,
      localizacao: info.localizacao,
      status: "done",
      url: info.bemUrl,
    },
  ]);
  const formData = new FormData()

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleSuccess = async (value) => {
    setLoading(true)
    try {
      await httpService.put("/bem", {
        "nome": value.name, "localizacao": value.localizacao, "codbem": info.idBem
      })

      fileList.forEach((file) => {
        formData.append('file', file)
      })
      await httpService.put(
        `/bem/addfiles?id=${info.idBem}`, formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${value._boundary}`,
          },
        }
      );


    } catch (error) {
      setLoading(false)
      console.info(error)
      // console.info(error.config.url.includes('/bem/addfiles?id='))
      // if (error.config.url.includes('/bem/addfiles?id=')) {
      // return message.error("Houve um erro para editar esse patrimonio, por favor tente mais tarde!")
      // }
      return message.error("Houve um erro para editar esse patrimonio, por favor tente mais tarde!")
    }
    setLoading(false)
    message.success("Mudanças salvas com sucesso!")
    handleAction()
    handleCancelModal()
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.info(file)
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Modal
        title="Dados do novo patrimonio"
        open={open}
        okButtonProps={{
          loading: loading
        }}
        onCancel={handleCancelModal}
        footer={[
        ]}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          initialValues={{ ...info }}
          onFinish={handleSuccess}
        >
          <Form.Item label="Envie seu arquivo aqui. (Apenas em formato pdf,jpg e png)" valuePropName="fileList">
            <>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                {...props}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </>
          </Form.Item>
          <Form.Item name="name" label="Nome do patrimonio">
            <Input />
          </Form.Item>
          <Form.Item name="localizacao" label="Descrição">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={loading} >Atualizar</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAlterarDadosPatrimonio;
