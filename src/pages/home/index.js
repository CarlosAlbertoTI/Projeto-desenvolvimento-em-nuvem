import { useState, useEffect } from "react";
import { Button, message, Input, Empty, Row, Col, Typography } from "antd";
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import LoadingCardPatrimonio from "../../components/LoadingCardPatrimonio";
import ModalAdicionarPatrimonio from "../../components/ModalAdicionarPatrimonio";
import httpService from "../../service/http";

import "./index.css";

const { Title } = Typography;

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [showAddPatrimonioModal, setShowAddPatrimonioModal] = useState(false);

  const [nome, setNome] = useState("Usuário");

  const [buscaPatrimonio, setBuscaPatrimonio] = useState("");
  const [buscaLocalizacaoPatrimonio, setBuscaLocalizacaoPatrimonio] = useState("");

  const [listaDeMeusPatrimonios, setListaDeMeusPatrimonios] = useState([]);
  const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] = useState([]);

  const userData = JSON.parse(localStorage.getItem("user"));

  const getUserData = async () => {
    const meusPatrimoniosRequest = await httpService.get("/bem", {
      headers: {
        Authorization: "Basic " + btoa(`${userData.nome}:${userData.senha}`),
      },
    });

    const patrimoniosParaAvaliarRequest = await httpService.get("/bem", {
      headers: {
        Authorization: "Basic " + btoa("superuser:superuser"),
      },
    });
    const filterPatrimoniosAvaliarRequest =
      patrimoniosParaAvaliarRequest.data.filter(
        (patrimonio) => patrimonio.usuarioId !== userData.codigoUsuario
      );
    return {
      nome: userData.nome,
      meusPatrimonios: meusPatrimoniosRequest.data,
      patrimoniosAvaliar: filterPatrimoniosAvaliarRequest,
    };
  };

  const updateData = async () => {
    const { nome, meusPatrimonios, patrimoniosAvaliar } = await getUserData();
    setNome(nome);
    setListaDeMeusPatrimonios(meusPatrimonios);
    setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar);
  };

  const handleShowAddPatrimonioModal = async (value) => {
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
      setShowAddPatrimonioModal((oldValue) => !oldValue);
      return;
    }
    try {
      await httpService.put(
        `/bem/addfiles?id=${handleAddPatrimonioRequest.data.idBem}`, value,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${value._boundary}`,
          },
        }
      );
    } catch (error) {
      message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
      );
      setShowAddPatrimonioModal((oldValue) => !oldValue);
      return;
    }
    // console.info("Adicionando Patrimonio ao usuario");
    // console.info(value)
    updateData();
    setShowAddPatrimonioModal((oldValue) => !oldValue);
  };

  useEffect(() => {
    setLoading(true);
    updateData();
    console.info("ASDHASKJDHASKJDHSA")
    setLoading(false)
  }, []);

  useEffect(() => {
    if (buscaPatrimonio !== "") {
      setLoading(true);
      const novaListaMeusPatrimonios = listaDeMeusPatrimonios.filter((value) =>
        value.name.includes(buscaPatrimonio)
      );
      setListaDeMeusPatrimonios(novaListaMeusPatrimonios);
      setLoading(false);
    } else {
      setLoading(true);
      updateData();
      setLoading(false);
    }
  }, [buscaPatrimonio]);


  useEffect(() => {
    if (buscaLocalizacaoPatrimonio !== "") {
      setLoading(true);
      const novaListaMeusPatrimonios = listaDeMeusPatrimonios.filter((value) =>
        value.localizacao.includes(buscaLocalizacaoPatrimonio)
      );
      setListaDeMeusPatrimonios(novaListaMeusPatrimonios);
      setLoading(false);
    } else {
      setLoading(true);
      updateData();
      setLoading(false);
    }
  }, [buscaLocalizacaoPatrimonio]);

  return (
    <Layout>
      <div className="container">
        <div className="container_user_info">
          <Title level={2}>
            Seja bem vindo <b>{nome}</b>
          </Title>
        </div>
        <div className="container_user_info">
          {showAddPatrimonioModal && (
            <ModalAdicionarPatrimonio
              open={showAddPatrimonioModal}
              handleOk={handleShowAddPatrimonioModal}
              handleCancel={() => setShowAddPatrimonioModal(false)}
            />
          )}
          <Button
            style={{
              width: "300px",
              height: "40px",
              backgroundColor: "#BF6900",
              color: "white",
            }}
            onClick={() => setShowAddPatrimonioModal(true)}
            type="primary"
          >
            Adicionar Patrimonio
          </Button>
        </div>
        <Row className="container_search_container">
          <Col span={11} style={{ display: 'flex', flexDirection: 'column', height: '115px' }}>
            <Title level={4}>Busca por titulo</Title>
            <Input
              size="large"
              placeholder="Digite aqui o nome do patrimonio"
              onChange={(newValue) => setBuscaPatrimonio(newValue.target.value)}
            />
          </Col>
          <Col span={11} style={{ display: 'flex', flexDirection: 'column', height: '115px' }}>
            <Title level={4} style={{ width: '200px' }}>Busca por localização</Title>
            <div style={{ display: 'flex' }}>
              <Input
                size="large"
                placeholder="Digite aqui a localização do patrimonio"
                onChange={(newValue) => setBuscaLocalizacaoPatrimonio(newValue.target.value)}
              />
            </div>
          </Col>
        </Row>


        <div className="container_novos_patrimonios">
          <Title level={3}>Meus Patrimonios</Title>
          <div className="container_cards">
            {!loading && (
              <>
                {listaDeMeusPatrimonios.length === 0 && (
                  <Empty style={{ margin: "20px auto" }} />
                )}
                {listaDeMeusPatrimonios.length > 0 &&
                  listaDeMeusPatrimonios.map((value, index) => (
                    <>
                      <CardPatrimonio
                        key={index}
                        hasUser={true}
                        info={value}
                        handleAction={() => updateData()}
                      />
                    </>
                  ))}
              </>
            )}
            {loading && <LoadingCardPatrimonio hasUser={true} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
