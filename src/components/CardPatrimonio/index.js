import { useState } from 'react'
import { Card, Image, Popconfirm, message } from 'antd'
import { EditOutlined, DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import ModalValidacao from '../ModalValidacao';
import ModalAlterarDadosPatrimonio from '../ModalEditarPatrimonio';

const { Meta } = Card


const CardPatrimonio = ({ hasUser = false, info={}},key) => {
    const { nome, descricao, photoUrl } = info
    const [showModalValidacao, setShowModalValidacao] = useState(false)
    const [showModalEditar, setShowModalEditar] = useState(false)

    const handleDeletePatrimonio = () => {
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
            <ModalValidacao open={showModalValidacao} handleCancel={() => setShowModalValidacao(false)} />
            <ModalAlterarDadosPatrimonio open={showModalEditar} handleCancelModal={() => setShowModalEditar(false)} />
            <Card
                hoverable
                style={{ width: 240, marginBottom: '30px' }}
                cover={<Image
                    src={photoUrl}
                />}

                actions={hasUser ? [
                    <CommentOutlined key="comment" onClick={() => {
                        setShowModalValidacao(true)
                    }} />,
                    <EditOutlined key="edit" onClick={() => setShowModalEditar(true)} />,
                    <Popconfirm
                        title="Certeza que deseja excluir esse patrimonio?"
                        onConfirm={() => handleDeletePatrimonio()}
                        okText="Deletar"
                        cancelText="Cancelar"
                    >
                        <DeleteOutlined key="delete" color='red' />
                    </Popconfirm>
                ] : [
                    <CommentOutlined key="comment" onClick={
                        () => setShowModalValidacao(true)} />
                ]}
            >
                <Meta title={nome} description={descricao} />
            </Card>
        </>
    )
}

export default CardPatrimonio
