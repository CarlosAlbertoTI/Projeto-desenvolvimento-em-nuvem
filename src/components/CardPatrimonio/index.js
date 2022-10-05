import { useState, useEffect } from "react";
import { Card, Image, Popconfirm, message, Badge } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import ModalValidacao from "../ModalValidacao";
import ModalAlterarDadosPatrimonio from "../ModalEditarPatrimonio";
import httpService from "../../service/http";
const { Meta } = Card;

const CardPatrimonio = ({ hasUser = false, info = {}, handleAction }, key) => {
  const { nome, descricao, photoUrl } = info;
  const [showModalValidacao, setShowModalValidacao] = useState(false);
  const [countValidations, setCountValidation] = useState(0);
  const [showModalEditar, setShowModalEditar] = useState(false);

  const handleDeletePatrimonio = async () => {
    try {
      await httpService.delete("/bem/" + info.idBem);
    } catch (error) {
      message.error(
        "Houve um erro para excluir esse patrimonio, por favor tente mais tarde"
      );
      return;
    }
    handleAction()
    message.success("Patrimonio deletado com sucesso!");
  };

  const handleCountValidations = async () => {
    let result;
    try {
      result = await httpService.get(`/validation?bemid=${info.idBem}`)
    } catch (error) {
      message.error("Erro em carregar a contagem de validações")
    }
    setCountValidation(result.data.length)
  }

  useEffect(() => {
    handleCountValidations()
  }, [])

  return (
    <>
      <ModalValidacao
        open={showModalValidacao}
        info={info}
        handleAction={handleAction}
        handleCancel={() => setShowModalValidacao(false)}
      />
      <ModalAlterarDadosPatrimonio
        open={showModalEditar}
        info={info}
        handleAction={handleAction}
        handleCancelModal={() => setShowModalEditar(false)}
      />
      <Card
        hoverable
        style={{ width: 240, marginBottom: "30px" }}
        cover={<Image src={info.bemUrl} />}
        actions={
          hasUser
            ? [
              <Badge count={countValidations}>
                <CommentOutlined
                  key="comment"
                  onClick={() => {
                    setShowModalValidacao(true);
                  }}
                />
              </Badge>,
              <EditOutlined
                key="edit"
                onClick={() => setShowModalEditar(true)}
              />,
              <Popconfirm
                title="Certeza que deseja excluir esse patrimonio?"
                onConfirm={() => handleDeletePatrimonio()}
                okText="Deletar"
                cancelText="Cancelar"
              >
                <DeleteOutlined key="delete" color="red" />
              </Popconfirm>,
            ]
            : [
              <Badge count={countValidations}>
                <CommentOutlined
                  key="comment"
                  onClick={() => {
                    setShowModalValidacao(true);
                  }}
                />
              </Badge>,
            ]
        }
      >
        <Meta title={info.name} description={info.localizacao} />
      </Card>
    </>
  );
};

export default CardPatrimonio;
