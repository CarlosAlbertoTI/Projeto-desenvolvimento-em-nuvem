import { useState, useEffect } from "react";
import { Card, Image, Popconfirm, message, Badge, Empty, Typography } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import ModalValidacao from "../ModalValidacao";
import ModalAlterarDadosPatrimonio from "../ModalEditarPatrimonio";
import httpService from "../../service/http";

import './style.css'

const { Meta } = Card;
const { Text } = Typography;


const CardPatrimonio = ({ hasUser = false, info = {}, handleAction }, key) => {
  const [countValidations, setCountValidation] = useState(0);
  const [showModalValidacao, setShowModalValidacao] = useState(false);
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
    message.success("Patrimonio deletado com sucesso!");
    return handleAction()
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
      {showModalValidacao && (
        <ModalValidacao
          open={showModalValidacao}
          info={info}
          handleAction={handleAction}
          handleCancel={() => { setShowModalValidacao(false) }}
        />
      )}

      <ModalAlterarDadosPatrimonio
        open={showModalEditar}
        info={info}
        handleAction={handleAction}
        handleCancelModal={() => setShowModalEditar(false)}
      />
      <Card
        id="cardPatrimonio"
        hoverable
        cover={
          <>
            {info.bemUrl !== null && (
              <Image style={{
                borderRadius: '20px 20px 0 0',
                border: '5px solid #BF6900',
                height: '300px',
              }} src={info.bemUrl} />
            )}
            {info.bemUrl === null && (
              <Empty
                style={{
                  borderRadius: '20px 20px 0 0',
                  border: '5px solid #BF6900',
                  paddingTop: '50px',
                  margin: '0 auto',
                  height: '300px'
                }}
                description={
                  <span>
                    Bem cadastrado sem arquivo, ou arquivo não carregado
                  </span>
                }
              >
              </Empty>
            )}

          </>
        }
        actions={
          hasUser
            ? [
              <Badge count={countValidations} onClick={() => {
                setShowModalValidacao(true);
              }}>
                <CommentOutlined
                  key="comment"
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


        <Meta style={{
          height: '83px'
        }} title={
          <Text>{info.name}</Text>
        }
          description={
            <Text type="secondary">{info.localizacao}</Text>
          }
        />
      </Card >
    </>
  );
};

export default CardPatrimonio;
