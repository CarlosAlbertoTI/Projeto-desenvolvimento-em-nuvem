import { useState, useEffect } from "react";
import { Button, message, Input, Empty } from "antd";
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import ModalAdicionarPatrimonio from "../../components/ModalAdicionarPatrimonio";
// import httpService from "../../service/http";
import "./index.css";
import LoadingCardPatrimonio from "../../components/LoadingCardPatrimonio";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showAddPatrimonioModal, setShowAddPatrimonioModal] = useState(false);
  const [nome, setNome] = useState("Usuário");
  const [buscaPatrimonio, setBuscaPatrimonio] = useState("");
  const [listaDeMeusPatrimonios, setListaDeMeusPatrimonios] = useState([]);
  const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] = useState([]);

  const getUserData = () => {
    // const result = await httpService.get("/")
    // const patrimoniosParaAvaliar = await httpService.get("")
    return {
      nome: "Carlos",
      meusPatrimonios: [
        {
          nome: "Carlos",
          descricao: "este e um patrimonio",
          photoUrl:
            "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
        },
        {
          nome: "Carlos",
          descricao: "este e um patrimonio",
          photoUrl:
            "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
        },
        {
          nome: "Carlos",
          descricao: "este e um patrimonio",
          photoUrl:
            "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
        },
      ],
      patrimoniosAvaliar: [{
        nome: "Carlos",
        descricao: "este e um patrimonio",
        photoUrl:
          "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      }, {
        nome: "Carlos",
        descricao: "este e um patrimonio",
        photoUrl:
          "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      }, {
        nome: "Carlos",
        descricao: "este e um patrimonio",
        photoUrl:
          "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
      }],
    };
  };

  const updateData = () => {
    const { nome, meusPatrimonios, patrimoniosAvaliar } = getUserData();
    setNome(nome);
    setListaDeMeusPatrimonios(meusPatrimonios);
    setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar);
    setLoading(false);
  }

  const handleShowAddPatrimonioModal = async (value) => {
    try {
      // const result = await httpService.post("",value)
      // throw Error("sdff")
    } catch (error) {
      return message.error(
        "Não foi possivel adicionar um patrimonio, por favor tente mais tarde!"
      );
    }
    console.info("Adicionando Patrimonio ao usuario");
    // console.info(value)
    setShowAddPatrimonioModal((oldValue) => !oldValue);
  };

  useEffect(() => {
    setLoading(true);
    // return;
    updateData()
  }, []);

  useEffect(() => {
    if (buscaPatrimonio !== "") {
      const novaListaMeusPatrimonios = listaDeMeusPatrimonios.filter((value) => value.nome.includes(buscaPatrimonio))
      setListaDeMeusPatrimonios(novaListaMeusPatrimonios)
    } else {
      updateData()
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
              handleOk={() => setShowAddPatrimonioModal(false)}
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
            onClick={handleShowAddPatrimonioModal}
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
                  <Empty style={{ margin: '20px auto', }} />
                )}
                {listaDeMeusPatrimonios.length > 0 && listaDeMeusPatrimonios.map((value, index) => (
                  <>
                    <CardPatrimonio
                      key={index}
                      hasUser={true}
                      info={value}
                    />
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
                  <Empty style={{ margin: '20px auto', }} />
                )}
                {listaDePatrimoniosParaAvaliacao.map((value, index) => (
                  <CardPatrimonio
                    key={index}
                    hasUser={false}
                    info={value}
                  />
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
