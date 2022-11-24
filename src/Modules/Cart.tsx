import { Card, Dropdown, Row, Col, Icon } from "antd";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { INavigationBox } from "@interfaces";

const { Meta } = Card;

interface IProps {
    data: INavigationBox;
    onclick?: (title: string, idData?: string) => void;
    onTogglePopup?: (idItem: string | undefined) => void;
    visibleDropdown: boolean;
    index: string | undefined;
}

export const ModuleCart = (props: IProps) => {
    //page Hooks
    const { data, visibleDropdown, index } = props;
    const history = useHistory();

    const handleRoute = () => {
        if (!data.dropdownStatus) history.push(data.link);
    };

    return (
        <Dropdown
            visible={visibleDropdown && index === data._id}
            overlay={
                data.dropdownStatus ? (
                    <ItemDropdown index={undefined} visibleDropdown={visibleDropdown} data={data} />
                ) : (
                    <></>
                )
            }
            //@ts-ignore
            // getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
        >
            <StyledCart color={data.colorTheme}>
                <Card>
                    <Meta
                        title={
                            <>
                                <div className="title">{data.title}</div>
                                <div className="desc">{data.text} </div>
                            </>
                        }
                        style={{ color: "#fff" }}
                    />
                </Card>
                <div className="box">
                    <div
                        className="overlay"
                        // onClick={() => {
                        //     props.onclick(t("page.edit_navigation_box"), data._id);
                        // }}
                        onClick={handleRoute}
                    ></div>
                    <div className="top"></div>
                </div>
                <img className="iconUrl" src={data.iconUrl} alt="Icon" />
            </StyledCart>
        </Dropdown>
    );
};

const ItemDropdown = (props: IProps) => {
    const { data } = props;
    return (
        <StyledDropdown>
            <Row>
                {data.dropdownOptions &&
                    data.dropdownOptions.map((item, index) => (
                        <Col key={index} className="col-item" span={12}>
                            <Link to={item.link}>
                                <Icon
                                    type={item.iconUrl}
                                    theme="filled"
                                    style={{ color: data.colorTheme, fontSize: 16 }}
                                />
                                <div className="name-item">{item.name}</div>
                            </Link>
                        </Col>
                    ))}
            </Row>
        </StyledDropdown>
    );
};
const StyledCart = styled.div<{ color: string }>`
    cursor: pointer;
    width: 100%;

    height: 160px !important;
    background: transparent !important;

    color: #fff;
    .ant-card {
        border-radius: 6px;
    }
    .iconUrl {
        position: absolute;
        right: 0;
        bottom: 0;
        /* width: 30%; */
        height: 65%;
        z-index: 1;
        object-fit: cover;
        opacity: 0.25;
        max-width: 50%;
    }
    .ant-card-body {
        z-index: 10;
    }
    .title {
        color: #fff !important;
        font-style: normal;
        font-weight: 600;
        font-size: 25px;
        line-height: 2.5rem;
        margin-bottom: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 22px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 20px;
        }
    }
    .desc {
        line-height: 1.4rem;
        font-weight: normal;
        font-size: 16px;
        line-height: 21px;
        color: #fff !important;
        opacity: 0.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 14px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 12px;
        }
    }
    &:hover .box {
        opacity: 1;
        visibility: visible;
    }
    .box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 12px;
        /* background-color: ${(p) => p.theme.colors.textSecondary}; */
        line-height: initial;
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: space-between;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all ease-in-out 0.3s;
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            font-size: 16px;
        }
        @media (max-width: ${(p) => p.theme.breakPoints.breakMobilePhone}) {
            font-size: 14px;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: transparent;
            z-index: 2;
        }
    }
    .top {
        display: flex;
        align-items: flex-end;
        position: relative;
        top: -5px;
    }
    .bottom {
        cursor: pointer;
    }
    .top,
    .bottom {
        z-index: 3;
    }
    .icon-delete {
        width: 20px;
        height: 20px;
        object-fit: cover;
        cursor: pointer;
    }
    .icon_menu {
        width: 12px;
        height: 21px;
        object-fit: cover;
        cursor: pointer;
    }
    .ant-card {
        width: 100%;
        height: 100%;
        background-color: ${(p) => p.color};
        background-size: cover;
    }
    .icon-menu {
        cursor: pointer;
    }
`;
const StyledDropdown = styled.div`
    background-color: white;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    padding: 1.5rem;
    max-width: 350px;
    margin-top: 12px;
    z-index: 10px;
    .col-item {
        a {
            display: flex;
            margin: 10px 0;
            align-items: center;
            .name-item {
                color: ${(p) => p.theme.colors.fadedText};
                font-size: 14px;
                font-weight: 500;
                margin-left: 8px;
            }
        }
    }
`;
