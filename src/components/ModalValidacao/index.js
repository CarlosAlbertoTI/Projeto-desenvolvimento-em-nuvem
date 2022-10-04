import { Modal, Card, Image, message, Button } from 'antd';
import React, { useState } from 'react';

const { Meta } = Card;
const ModalValidacao = ({ open, handleCancel }, key) => {
    const [loading, setLoading] = useState(false)

    const handleOkValidar = async () => {
        setLoading(true)
        try {
            // request
        } catch (error) {
            setLoading(false)
            return message.error("Houve um erro para validar esse patrimonio, por favor tente mais tarde!")
        }
        setLoading(false)
        message.success("Validação feita com sucesso!")
        handleCancel()

    }


    return (
        <>
            <Modal
                key={key}
                width={300}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
                title="Você deseja validar esse patrimonio?"
                open={open}
                onCancel={handleCancel}
                okButtonProps={{
                    loading: loading,
                    disabled: false,
                }}
                cancelButtonProps={{
                    disabled: false,
                }}
                footer={[
                    <Button loading={loading} onClick={handleOkValidar}>
                        Validar
                    </Button>
                ]}
            >
                <Card
                    key={key}
                    hoverable
                    cover={<Image
                        src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
                    />}
                >
                    <Meta key={key} title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Modal>
        </>
    );
};

export default ModalValidacao;