import { Modal, Card, Image, message, Button } from 'antd';
import React, { useState } from 'react';
import httpService from "../../service/http";

const { Meta } = Card;
const ModalValidacao = ({ open, handleAction, handleCancel, info }, key) => {
    const [loading, setLoading] = useState(false)

    const handleOkValidar = async () => {
        setLoading(true)
        try {
            await httpService.post("/validation", {
                "aprovacao": true,
                "comentarios": "string",
                "idBem": info.idBem
            })
        } catch (error) {
            setLoading(false)
            message.error("Houve um erro para validar esse patrimonio, por favor tente mais tarde!")
            handleCancel();
            return
        }
        setLoading(false)
        message.success("Validação feita com sucesso!")
        handleAction()
        return handleCancel()
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
                        src={info.bemUrl}
                    />}
                >
                    <Meta key={key} title={info.name} description={info.localization} />
                </Card>
            </Modal>
        </>
    );
};

export default ModalValidacao;