import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { Row, Col } from "antd";

export const RowLoadingLarge = () => {
    return (
        <StyledRow>
            {[1, 2, 3, 4, 5].map((e) => (
                <Row
                    key={e}
                    className="row-loading"
                    style={{ height: "100%" }}
                    gutter={24}
                    type="flex"
                    align="middle"
                >
                    <Col sm={{ span: 5 }} span={8}>
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            style={{ width: 80, height: 80 }}
                        />
                    </Col>
                    <Col sm={{ span: 19 }} span={16}>
                        <Skeleton animation="wave" width={"50%"} />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Col>
                </Row>
            ))}
        </StyledRow>
    );
};

export const RowLoadingContact = () => {
    return (
        <StyledRow>
            {[1, 2, 3, 4, 5, 6, 7].map((e) => (
                <Row
                    key={e}
                    className="row-loading"
                    style={{ height: "100%", marginBottom: 18 }}
                    gutter={24}
                    type="flex"
                    align="middle"
                >
                    <Col sm={{ span: 5 }} span={8}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Col>
                    <Col sm={{ span: 19 }} span={16}>
                        <Skeleton animation="wave" width={"80%"} />
                        <Skeleton animation="wave" />
                    </Col>
                </Row>
            ))}
        </StyledRow>
    );
};

export const RowLoadingSegment = () => {
    return (
        <StyledRow>
            {[1, 2, 3, 4, 5, 6, 7].map((e) => (
                <Row
                    key={e}
                    className="row-loading"
                    style={{ height: "100%", marginBottom: 18 }}
                    gutter={24}
                    type="flex"
                    align="middle"
                >
                    <Col span={24}>
                        <Skeleton animation="wave" width={"90%"} />
                        <Skeleton animation="wave" />
                    </Col>
                </Row>
            ))}
        </StyledRow>
    );
};

export const RowLoadingMerge = () => {
    return (
        <StyledRow>
            {[1, 2, 3, 4, 5, 6, 7].map((e) => (
                <Row
                    key={e}
                    className="row-loading"
                    style={{ height: "100%", marginBottom: 18 }}
                    gutter={24}
                    type="flex"
                    align="middle"
                >
                    <Col sm={{ span: 3 }} span={4}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Col>
                    <Col sm={{ span: 6 }} span={4}>
                        <Skeleton animation="wave" width={"80%"} />
                        <Skeleton animation="wave" />
                    </Col>
                    <Col sm={{ span: 3 }} span={4}>
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Col>
                    <Col sm={{ span: 12 }} span={8}>
                        <Skeleton animation="wave" width={"80%"} />
                        <Skeleton animation="wave" />
                    </Col>
                </Row>
            ))}
        </StyledRow>
    );
};

const StyledRow = styled.div`
    width: 100%;
    .row-loading {
        background-color: white;
        padding: 10px 18px;
        margin-bottom: 28px;
        border-radius: 6px;
    }
`;
