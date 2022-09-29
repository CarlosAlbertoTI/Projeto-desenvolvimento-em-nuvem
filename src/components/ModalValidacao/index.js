import { Modal, Card, Image, message } from 'antd';
import React from 'react';

const { Meta } = Card;
const ModalValidacao = ({ open, handleOk, handleCancel }) => {


    const handleOkValidar = async () => {
        try {
            // request
        } catch (error) {
            return message.error("Houve um erro para validar esse patrimonio, por favor tente mais tarde!")
        }
        message.success("Validação feita com sucesso!")
        return handleOk()

    }


    return (
        <>
            <Modal
                width={300}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                title="Você deseja validar esse patrimonio?"
                okText="Validar"
                open={open}
                onOk={handleOkValidar}
                onCancel={handleCancel}
                okButtonProps={{
                    disabled: false,
                }}
                cancelButtonProps={{
                    disabled: false,
                }}
            >
                <Card
                    hoverable
                    cover={<Image
                        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                    />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Modal>
        </>
    );
};

export default ModalValidacao;