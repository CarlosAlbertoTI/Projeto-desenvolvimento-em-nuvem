import Layout from '../../components/Layout/layout'
import './index.css'

const Erro = () => {
    return (
        <Layout>
            <div style={{
                display:'flex',
                flexDirection:'column',
                alignItens:'center',
                justifyContent:'center',
                height:'90vh',
            }}>
                <h3 style={{alignSelf:'center', padding:'10px', alignText:'center'}}>Tivemos um erro na aplicação, por favor, tente novamente mais tarde!</h3>
            </div>
        </Layout>
    )
}

export default Erro