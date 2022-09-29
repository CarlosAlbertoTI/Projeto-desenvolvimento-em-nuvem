import { useState, useEffect } from "react";
import { Button, List, Skeleton, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../../components/Layout/layout";
import "./index.css";
import ModalAdicionarUsuario from "../../components/ModalAdicionarUsuario";
import ModalEditarUsuario from "../../components/ModalEditarUsuario";
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const AdminPage = () => {

  const [nome, setNome] = useState("Usuário");
  const [usuarios, setUsuario] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [showAdicionarUsuarioModal, setShowAdicionarUsuarioModal] = useState(false);
  const [showEditarUsuarioModal, setShowEditarUsuarioModal] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);



  const getUserData = () => {
    // const result = await httpService.get("")
    // const listaUsuario = await httpService.get("")
    return {
      nome: "Carlos",
      usuarios: [
        {}, {}, {}
      ],
    }
  }

  const handleDeleteUsuario = (e) => {
    try {
      // request
    } catch (error) {
      message.error("Houve um erro ao tentar deletar este usuário, por favor tente mais tarde!")
      return;
    }
    console.log(e);
    message.success("Usuário deletado com sucesso!");
  };

  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);

  useEffect(() => {
    const { nome, usuarios, } = getUserData()
    setNome(nome)
    setUsuario(usuarios)
  }, [])

  // const handleAdicionarUserModal = () => {
  //   setShowAdicionarUsuarioModal((oldValue) => oldValue);
  // };

  return (
    <Layout>
      {/* {console.info(data)}
      {console.info(list)} */}
      <div className="container">
        <div className="container_user_info">
          <h1>
            Seja bem vindo <b>{nome}</b>
          </h1>
          <div style={{ width: "90vw" }}>
            {showEditarUsuarioModal && (
              <ModalEditarUsuario
                open={showEditarUsuarioModal}
                handleOk={() => setShowEditarUsuarioModal(false)}
                handleCancel={() => setShowEditarUsuarioModal(false)}
              />
            )}
            {showAdicionarUsuarioModal && (
              <ModalAdicionarUsuario
                open={showAdicionarUsuarioModal}
                handleOk={() => setShowAdicionarUsuarioModal(false)}
                handleCancel={() => setShowAdicionarUsuarioModal(false)}
              />
            )}
            <Button
              style={{
                width: "300px",
                height: "40px",
                backgroundColor: "#BF6900",
                color: "white",
              }}
              onClick={() => setShowAdicionarUsuarioModal(true)}
              type="primary"
            >
              Adicionar Usuário
            </Button>
            <h3 style={{ margin: "10px" }}>Lista de Usuarios</h3>
            <List
              loading={initLoading}
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  style={{
                    padding: "20px",
                    backgroundColor: "#BF6900",
                  }}
                  actions={[
                    <EditOutlined
                      style={{ color: "white" }}
                      key="edit"
                      onClick={() => { setShowEditarUsuarioModal(true) }}
                      width="20"
                    />,
                    <Popconfirm
                      title="Certeza que deseja excluir esse usuário?"
                      onConfirm={handleDeleteUsuario}
                      okText="Deletar"
                      cancelText="Cancelar"
                    >
                      <DeleteOutlined
                        style={{ color: "white" }}
                        key="delete"
                        color="red"
                      />
                    </Popconfirm>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={<p style={{ color: "white" }}>{item.name.last}</p>}
                      description={<p style={{ color: "white" }}>{item.email}</p>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
