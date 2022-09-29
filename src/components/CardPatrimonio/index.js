import { useState } from 'react'
import { Card, Image, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import ModalValidacao from '../ModalValidacao';
import ModalAlterarDadosPatrimonio from '../ModalEditarPatrimonio';

const { Meta } = Card


const CardPatrimonio = ({ hasUser = false, info = {} }) => {
    const { nome, descricao, photoUrl } = info
    const [showModalValidacao, setShowModalValidacao] = useState(false)
    const [showModalEditar, setShowModalEditar] = useState(false)

    const handleModalValidacao = () => {
        setShowModalValidacao((oldValue) => !oldValue)
    }
    const handleModalEditar = () => {
        setShowModalEditar((oldValue) => !oldValue)
    }
    const handleDeletePatrimonio = (e) => {
        try {
            // request
        } catch (error) {
            message.error("Houve um erro para excluir esse patrimonio, por favor tente mais tarde")
            return;
        }
        message.success('Patrimonio deletado com sucesso!');
    };

    // https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp
    return (
        <>
            <ModalValidacao open={showModalValidacao} handleOk={handleModalValidacao} handleCancel={handleModalValidacao} />
            <ModalAlterarDadosPatrimonio open={showModalEditar} handleOkModal={handleModalEditar} handleCancelModal={handleModalEditar} />
            <Card
                hoverable
                style={{ width: 240, marginBottom: '30px' }}
                cover={<Image
                    src={photoUrl}
                />}

                actions={hasUser ? [
                    <CommentOutlined key="comment" onClick={() => {
                        handleModalValidacao()
                    }} />,
                    <EditOutlined key="edit" onClick={() => handleModalEditar()} />,
                    <Popconfirm
                        title="Certeza que deseja excluir esse patrimonio?"
                        onConfirm={handleDeletePatrimonio}
                        okText="Deletar"
                        cancelText="Cancelar"
                    >
                        <DeleteOutlined key="delete" color='red' />,
                    </Popconfirm>
                ] : [
                    <CommentOutlined key="comment" onClick={() => {
                        handleModalValidacao()
                    }} />
                ]}
            >
                <Meta title={nome} description={descricao} />
            </Card>
        </>
    )
}

export default CardPatrimonio