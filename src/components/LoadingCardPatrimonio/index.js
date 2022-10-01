import { Card, Skeleton } from "antd";
import {
  EditOutlined,
  CommentOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const vetor = [1, 2, 3, 4];
const LoadingCardPatrimonio = ({hasUser = false }) => {
  return (
    <>
      {vetor.map((value, index) => (
        
        <Card
        key={index}
          hoverable
          style={{ width: 240, marginBottom: "30px" }}
          cover={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "220px",
                justifyContent: "center",
              }}
            >
            {console.info(hasUser)}
              <Skeleton.Image style={{ width: "240px", height: "300px" }} />
              <Skeleton
                active
                style={{ paddingTop: "20px", paddingLeft: "22px" }}
              />
            </div>
          }
          actions={
            hasUser
              ? [
                  <CommentOutlined key="comment" />,
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" color="red" />,
                ]
              : [<CommentOutlined key="comment" />]
          }
        ></Card>
      ))}
    </>
  );
};

export default LoadingCardPatrimonio;
