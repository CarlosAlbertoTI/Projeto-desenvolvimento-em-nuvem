import {Card} from 'antd'
import Layout from "../../components/Layout/layout";
import "./index.css";

const { Meta } = Card;
const vetor = [1, 2, 4, 5];
const Home = () => {
  return (
    <Layout>
      <div className="container">
        <div className="container_user_info">
          <h1>Seja bem vindo</h1>
        </div>
        <div className="container_novos_patrimonios">
          <h3>Aqui alguns patrimônios para validação</h3>
          <div className="container_cards">
            {vetor.map((value,index) =>
                 (
                    <Card
                        hoverable
                        style={{ width: 240, marginBottom:'30px' }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                )
            )}
          </div>
          
        </div>
        <div className="container_novos_patrimonios">
          <h3>Meus patrimonios</h3>
          <div className="container_cards">
            {vetor.map((value,index) =>
                 (
                    <Card
                        hoverable
                        style={{ width: 240, margin:'5px' }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
