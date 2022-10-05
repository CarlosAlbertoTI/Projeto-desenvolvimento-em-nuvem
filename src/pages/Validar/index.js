import { useState, useEffect } from 'react'
import Layout from "../../components/Layout/layout";
import CardPatrimonio from "../../components/CardPatrimonio";
import LoadingCardPatrimonio from "../../components/LoadingCardPatrimonio";
import httpService from "../../service/http";
import "./index.css";

const Validar = () => {
    const [loading, setLoading] = useState(false);
    const [listaDePatrimoniosParaAvaliacao, setListaDePatrimoniosParaAvaliacao] = useState([]);

    const getUserData = async () => {

        const patrimoniosParaAvaliarRequest = await httpService.get("/bem", {
            headers: {
                Authorization: "Basic " + btoa("superuser:superuser"),
            },
        });

        return {
            patrimoniosAvaliar: patrimoniosParaAvaliarRequest.data
        };
    };

    const updateData = async () => {
        const { patrimoniosAvaliar } = await getUserData();
        // console.info(patrimoniosAvaliar);
        setListaDePatrimoniosParaAvaliacao(patrimoniosAvaliar);
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        // return;
        updateData();

    }, []);

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