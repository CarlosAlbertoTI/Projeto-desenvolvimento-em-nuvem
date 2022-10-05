import { useState, useEffect } from "react";
import { Button, message, Input, Empty } from "antd";
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import ModalAdicionarPatrimonio from "../../components/ModalAdicionarPatrimonio";
import httpService from "../../service/http";
import "./index.css";
import LoadingCardPatrimonio from "../../components/LoadingCardPatrimonio";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showAddPatrimonioModal, setShowAddPatrimonioModal] = useState(false);
  const [nome, setNome] = useState("Usuário");
  const [buscaPatrimonio, setBuscaPatrimonio] = useState("");
  const [listaDeMeusPatrimonios, setListaDeMeusPatrimonios] = useState([]);
  const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] =
    useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  const getUserData = async () => {
    // console.info("request");
    // console.info(userData);
    // return
    const meusPatrimoniosRequest = await httpService.get(
      "/bem", {
      headers: {
        Authorization: "Basic " + btoa(`${userData.nome}:${userData.senha}`),
      }
    }
    );

    const patrimoniosParaAvaliarRequest = await httpService.get("/bem", {
      headers: {
        Authorization: "Basic " + btoa("superuser:superuser"),
      },
    });
    const filterPatrimoniosAvaliarRequest = patrimoniosParaAvaliarRequest.data.filter((patrimonio) => patrimonio.usuarioId !== userData.codigoUsuario)
    console.info("Lista patrimonios avaliar")
    console.info(patrimoniosParaAvaliarRequest.data)
    console.info(filterPatrimoniosAvaliarRequest)
    return {
      nome: userData.nome,
      meusPatrimonios: meusPatrimoniosRequest.data,
      patrimoniosAvaliar: filterPatrimoniosAvaliarRequest
    };
  };

  const updateData = async () => {
    const { nome, meusPatrimonios, patrimoniosAvaliar } = await getUserData();
    console.info("MEUS avaliar");
    console.info(patrimoniosAvaliar);
    setNome(nome);
    setListaDeMeusPatrimonios(meusPatrimonios);
    setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar);
    setLoading(false);
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
      await httpService.put(`/bem/addfiles?id=${handleAddPatrimonioRequest.data.idBem}`)
    } catch (error) {
      message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
      );
      setShowAddPatrimonioModal((oldValue) => !oldValue);
      return;
    }
    // console.info("Adicionando Patrimonio ao usuario");
    // console.info(value)
    updateData()
    setShowAddPatrimonioModal((oldValue) => !oldValue);
  };

  useEffect(() => {
    setLoading(true);
    // return;
    updateData();

  }, []);

  useEffect(() => {
    if (buscaPatrimonio !== "") {
      setLoading(true)
      const novaListaMeusPatrimonios = listaDeMeusPatrimonios.filter((value) =>
        value.name.includes(buscaPatrimonio)
      );
      setListaDeMeusPatrimonios(novaListaMeusPatrimonios);
      setLoading(false)
    } else {
      setLoading(true)
      updateData();
      setLoading(false)
    }
  }, [buscaPatrimonio]);

  return (
    <Layout>
      <div className="container">
        <div className="container_user_info">
          <h1>
            Seja bem vindo <b>{nome}</b>
          </h1>
        </div>
        <div className="container_search_container">
          <Input
            placeholder="Busque por algum dos seus patrimonios aqui"
            onChange={(newValue) => setBuscaPatrimonio(newValue.target.value)}
          />
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
        <div className="container_novos_patrimonios">
          <h3>Meus Patrimonios</h3>
          <div className="container_cards">
            {!loading && (
              <>
                {listaDeMeusPatrimonios.length === 0 && (
                  <Empty style={{ margin: "20px auto" }} />
                )}
                {listaDeMeusPatrimonios.length > 0 &&
                  listaDeMeusPatrimonios.map((value, index) => (
                    <>
                      <CardPatrimonio key={index} hasUser={true} info={value} handleAction={updateData} />
                    </>
                  ))}
              </>
            )}
            {loading && <LoadingCardPatrimonio hasUser={true} />}
          </div>
        </div>
        <div className="container_novos_patrimonios">
          <h3>Bens para avaliação</h3>
          <div className="container_cards">
            {!loading && (
              <>
                {listaDePatrimoniosParaAvaliacao.length === 0 && (
                  <Empty style={{ margin: "20px auto" }} />
                )}
                {listaDePatrimoniosParaAvaliacao.length > 0 &&
                  listaDePatrimoniosParaAvaliacao.map((value, index) => (
                    <CardPatrimonio key={index} hasUser={false} info={value} />
                  ))}
              </>
            )}
            {loading && <LoadingCardPatrimonio />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
