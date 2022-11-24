import { Row, Col } from "antd";
import styled from "styled-components";
import { ModuleBusinessFrom } from "src/Modules/businessModule";
import { theme } from "@utils";
// import { setLoading } from "@redux";
// import { useDispatch } from "react-redux";
import { NewMerchantSvg } from "@components";
import { useTranslation } from "react-i18next";
export const CreateBusiness = () => {
    // const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <StyledLayout>
            <Row gutter={16} className="content-row">
                <Col sm={24} md={12} className="left-item">
                    <ModuleBusinessFrom />
                </Col>
                <Col sm={24} md={12} className="right-item">
                    <StyledInfoLayout>
                        <div className="image-layout">
                            <NewMerchantSvg />
                        </div>
                        <div className="des-layout">
                            <h4>{t("page.new_account.connect_rocket_loyalty")}</h4>
                            <p>{t("page.new_account.rocket_loyalty_des")}</p>
                        </div>
                    </StyledInfoLayout>
                </Col>
            </Row>
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    background: #fff;
    .content-row {
        display: flex;
        align-items: center;

        background-image: initial;
        @media (max-width: ${theme.breakPoints.breakTablet}) {
            flex-direction: column;
            margin-top: 40px;
            .left-item {
                width: 100%;
            }
        }
        .right-item {
            align-items: center;
            .des-layout {
                @media (max-width: ${theme.breakPoints.breakTablet}) {
                    padding: 0;
                }
                h4 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 35px;
                    line-height: 48px;
                    color: #23262f;
                    @media (max-width: ${theme.breakPoints.breakTablet}) {
                        font-style: normal;
                        font-weight: 700;
                        font-size: 20px;
                        line-height: 27px;
                        text-align: center;
                        color: #000000;
                        padding: 0 60px;
                    }
                }
                p {
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 19px;
                    color: #777e91;
                    @media (max-width: ${theme.breakPoints.breakTablet}) {
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 19px;
                        text-align: center;
                        color: #6c7084;
                        padding: 0 60px;
                    }
                    @media (max-width: ${theme.breakPoints.breakMobileMedium}) {
                        padding: 0 16px;
                    }
                }
            }
            .image-layout {
                position: relative;
                img {
                    position: absolute;
                    top: 10px;
                    left: 20px;
                }
            }
        }
    }
    .desc_link {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: #6c7084;
        margin-top: -5px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 10px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 16px;
        .content-row {
            flex-direction: column-reverse;
        }
    }
`;
const StyledInfoLayout = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (max-width: ${theme.breakPoints.breakTablet}) {
        flex-direction: column;
    }
    @media (max-width: ${theme.breakPoints.breakTablet}) {
        flex-direction: column;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        .image-layout {
            position: relative;
            svg {
                width: 201px;
                height: 180px;
            }
        }
    }
`;
