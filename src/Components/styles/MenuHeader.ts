// import { enumTheme } from "@configs";
import styled from "styled-components";

export const StyledMenuHeader = styled.div`
    .ant-layout-header {
        /* position: fixed;
        top: 0;
        left: 0;
        width: 100vw; */
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: nowrap;
        display: flex;
        align-items: center;
        min-height: 4.486rem;
        z-index: 11;
        padding: 0 32px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
        background-color: ${(props) => props.theme.colors.main};
        a {
            text-decoration: none;
            color: #ffffff;
            &:hover {
                color: #ffffff;
            }
        }
        .ant-menu {
            background-color: ${(props) => props.theme.colors.main};
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #ffffff;
        }
    }
    .trigger {
        transform: rotate(90deg) translateX(4px);
        margin-right: 1rem;
    }
    .menu-divider {
        position: relative;
    }
    .menu-divider:before {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 1px;
        height: 100%;
        content: "";
        background-color: ${(props) => props.theme.colors.main};
    }
    .brand {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        font-size: 1.25rem;
        white-space: nowrap;
        svg {
            fill: ${(props) => props.theme.colors.primary};
        }

        @media (min-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            padding: 0 80px 0 24px;
            margin-right: 0;
            /* img {
                width: 36px;
                height: 36px;
            }
            .email-layout {
                h4 {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 22px;
                    color: #000000;
                    margin: 0;
                }
                p {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;

                    color: #a5a5a5;
                    margin: 0;
                }
            } */
        }
    }
    .ant-menu {
        font-family: inherit;
        line-height: inherit;
        box-shadow: none;
        display: inline-block;
        border: 0;
        margin-bottom: 1px;
    }
    .ant-menu-item,
    .ant-menu-item,
    .ant-menu-submenu-title {
        padding: 1.1rem 2rem;
    }
    .ant-menu-item,
    .ant-menu-submenu {
        top: 2px;
    }
    .nav-link {
        display: initial;
        color: inherit;
    }
    .ant-list-header,
    .ant-list-footer {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .dropdown-LINE {
        color: ${(p) => p.theme.colors.white};
    }
    .mobile-menu-item {
        color: ${(p) => p.theme.colors.black};
    }
    .ant-menu-item {
        a {
            font-size: 16px;
        }
    }
    .ant-menu-submenu-title .anticon {
        margin-right: 0;
    }
    .lang-title {
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            /* text-transform: uppercase; */
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            padding-left: 4px;
            color: #ffffff;
            margin: 0;
        }
    }
    .ant-menu-item {
        &:hover {
            color: #ffffff;
        }
        .title {
            display: flex;
            align-items: center;
            column-gap: 4px;
        }
    }
    .ant-menu-item-selected {
        color: #ffffff;
        /* border-bottom: 4px solid #ffffff !important; */
        .menu-heightlight {
            height: 4px;
            background: transparent;
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            left: 0;
            padding: 0 2rem;
            .line {
                width: 100%;
                background: #fff;
                height: 4px;
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
            }
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
        .ant-menu-submenu-title {
            padding: 1rem 1rem;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .ant-menu-submenu-title {
            padding: 1rem 1rem;
        }
    }
`;
