import { useState, useEffect } from 'react'
import { Button } from 'antd'
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import ModalAdicionarPatrimonio from "../../components/ModalAdicionarPatrimonio";
import "./index.css";

const vetor = [1, 2, 4, 5];

const Validar = () => {
    const [showAddPatrimonioModal, setShowAddPatrimonioModal] = useState(false);
    const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] = useState([]);

    const handleShowAddPatrimonioModal = () => {
        setShowAddPatrimonioModal((oldValue) => !oldValue);
    };

    const getUserDataAndPatrimonios = () => {
        // const result = await httpService.get("")
        // const patrimoniosParaAvaliar = await httpService.get("")
        return {
            patrimoniosAvaliar: [{}, {}, {}]
        }
    }


    useEffect(() => {
        const { patrimoniosAvaliar } = getUserDataAndPatrimonios()
        setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar)
    }, [])

    return (
        <Layout>
            <div className="container">
                <div className="container_novos_patrimonios" style={{ margin: '20px' }}>
                    <h3>Bens para avaliação</h3>
                    <div className="container_cards">
                        {vetor.map((value, index) => (
                            <CardPatrimonio key={index} info={
                                {
                                    nome: "Carlos",
                                    descricao: "este e um patrimonio",
                                    photoUrl: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
                                }
                            } />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Validar