import React, { useState } from "react";
import { Modal, Form, Input, message, Upload, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
}, key) => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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

  const handleSuccess = () => {
    setLoading(true)
    try {
      // request
    } catch (error) {
      setLoading(false)
      return message.error("Houve um erro para editar esse patrimonio, por favor tente mais tarde!")
    }
    setLoading(false)
    message.success("Mudanças salvas com sucesso!")
    handleCancelModal()
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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

        >
          <Form.Item valuePropName="fileList">
            <>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
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
          <Form.Item label="Nome do patrimonio">
            <Input />
          </Form.Item>
          <Form.Item label="Descrição">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Descrição">
            <Button htmlType="submit" loading={loading} onClick={handleSuccess}>Atualizar</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAlterarDadosPatrimonio;
