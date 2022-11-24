import { Button, Card, Col, Row } from "antd";

interface IProps {
    type: "fill";
    title: string;
    value: number;
    icon: Element;
    color: string;
    clickHandler: () => void;
}

export const SharedStatCard = ({ type, title, value, icon, color, clickHandler }: IProps) => {
    let before = null,
        after = null;

    const cardIcon = (
        <Col>
            <Button
                shape="circle"
                size="large"
                type="primary"
                style={{ backgroundColor: color, borderColor: color }}
                className={type !== "fill" ? "mr-4" : ""}
                onClick={clickHandler}
            >
                {icon}
            </Button>
        </Col>
    );

    if (icon) {
        type === "fill" ? (after = cardIcon) : (before = cardIcon);
    }

    return (
        <Card className="mb-4" style={type === "fill" ? { backgroundColor: color } : {}}>
            <Row type="flex" align="middle" justify="start">
                {before}
                <Col>
                    <h5 className={`mb-0 ${type === "fill" && "text-white"}`}>{value}</h5>
                    <small className={type === "fill" ? "text-white-50" : ""}>{title}</small>
                </Col>
                <span className="mr-auto" />
                {after}
            </Row>
        </Card>
    );
};

