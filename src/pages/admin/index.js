import { useState, useEffect } from "react";
import { Button, List, Skeleton, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../../components/Layout/layout";
import "./index.css";
import ModalAdicionarUsuario from "../../components/ModalAdicionarUsuario";
import ModalEditarUsuario from "../../components/ModalEditarUsuario";
import httpService from "../../service/http";

const AdminPage = () => {

  const [nome, setNome] = useState("Usuário");
  const [usuarios, setUsuario] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [chooseEditUser, setChooseEditUser] = useState({});
  const [showAdicionarUsuarioModal, setShowAdicionarUsuarioModal] = useState(false);
  const [showEditarUsuarioModal, setShowEditarUsuarioModal] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));


  const getUserData = async () => {
    let userList;
    try {
      userList = await httpService.get("/user", {
        headers: { Authorization: `Basic ${btoa("superuser:superuser")}` },
      })
    } catch (error) {
      message.error("Erro ao carregar a lista de usuários, por favor tente mais tarde!");
      return;
    }

    const filterUserList = userList.data.filter((user) => user.role !== "ROOT")
    return {
      nome: userData.nome,
      usuarios: filterUserList
    }
  }

  const handleDeleteUsuario = async (userId) => {
    try {
      await httpService.delete(`/user/${userId}`)
    } catch (error) {
      message.error("Houve um erro ao tentar deletar este usuário, por favor tente mais tarde!")
      return;
    }
    message.success("Usuário deletado com sucesso!");
    updateUserList()
  };

  const updateUserList = async () => {
    setInitLoading(true)
    const { nome, usuarios } = await getUserData()
    setNome(nome)
    setUsuario(usuarios)
    setInitLoading(false)
  }

  useEffect(() => {
    updateUserList()
  }, [])

  return (
    <Layout>
      <div className="container">
        <div className="container_user_info">
          <h1>
            Seja bem vindo <b>{nome}</b>
          </h1>
          <div style={{ width: "90vw" }}>
            {showEditarUsuarioModal && (
              <ModalEditarUsuario
                open={showEditarUsuarioModal}
                info={chooseEditUser}
                handleOk={() => setShowEditarUsuarioModal(false)}
                handleCancel={() => setShowEditarUsuarioModal(false)}
              />
            )}
            {showAdicionarUsuarioModal && (
              <ModalAdicionarUsuario
                open={showAdicionarUsuarioModal}
                handleOk={() => { setShowAdicionarUsuarioModal(false); updateUserList() }}
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
              dataSource={usuarios}
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
                      onClick={() => { setChooseEditUser(item); setShowEditarUsuarioModal(true) }}
                      width="20"
                    />,

                    <Popconfirm
                      title="Certeza que deseja excluir esse usuário?"
                      onConfirm={() => handleDeleteUsuario(item.codigoUsuario)}
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
                      title={<p style={{ color: "white" }}>{item.nome}</p>}
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
