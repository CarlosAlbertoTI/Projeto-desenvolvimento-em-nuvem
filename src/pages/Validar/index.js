import { useState, useEffect } from 'react'
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import LoadingCardPatrimonio from "../../components/LoadingCardPatrimonio";
import "./index.css";

const Validar = () => {
    const [loading, setLoading] = useState(false);
    const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] = useState([]);

    const getUserDataAndPatrimonios = () => {
        // const result = await httpService.get("")
        // const patrimoniosParaAvaliar = await httpService.get("")
        return {
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
            }]
        }
    }

    useEffect(() => {
        setLoading(true)
        const { patrimoniosAvaliar } = getUserDataAndPatrimonios()
        setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar)
        setLoading(false)
    }, [])

    return (
        <Layout>
            <div className="container">
                <div className="container_novos_patrimonios" style={{ margin: '20px' }}>
                    <h3>Bens para avaliação</h3>
                    <div className="container_cards">
                        {!loading && (
                            <>
                                {listaDePatrimoniosParaAvaliacao.map((value, index) => (
                                    <CardPatrimonio
                                        key={index}
                                        hasUser={false}
                                        info={value}
                                    />
                                ))}
                            </>
                        )}
                        {loading && (
                            <LoadingCardPatrimonio />
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Validar