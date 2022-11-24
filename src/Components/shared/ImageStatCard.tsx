import { Card, Carousel, Col, Row } from "antd";
import styled from "styled-components";

const StyledCard = styled.div`
    .ant-card-cover {
        position: relative;
    }
`;

const Cover = styled.div`
    position: relative;
    width: 100%;
    .ant-carousel {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .slick-slider {
        width: 100%;
        height: 100%;
    }
    .slick-slide > div {
        display: flex;
    }
    .image {
        position: relative;
        background-size: cover;
        background-position: top center;
        width: 100%;
    }
    .weakColor & .image {
        -webkit-filter: invert(100%);
        filter: invert(100%);
    }
    .content {
        position: relative;
        z-index: 9;
    }
`;

interface IStats {
    title: string;
    value: number;
}

interface IProps {
    images: string[];
    imageHeight: number;
    stats: IStats[];
}

export const SharedImageStatCard = ({ images, imageHeight, stats }: IProps) => (
    <StyledCard>
        <Card
            className="mb-4"
            cover={
                <Cover style={{ height: imageHeight }}>
                    <Carousel autoplay autoplaySpeed={4000} className="rounded-top overflow-hidden">
                        {images.map((image, index) => (
                            <div key={index}>
                                <div
                                    key={index}
                                    className="image"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                        height: imageHeight,
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </Cover>
            }
        >
            <Row type="flex" gutter={16} align="middle" justify="space-around">
                {stats.map((stat, index) => (
                    <Col className="text-center" key={index}>
                        <h5 className="mb-0">{stat.value}</h5>
                        <small>{stat.title}</small>
                    </Col>
                ))}
            </Row>
        </Card>
    </StyledCard>
);
