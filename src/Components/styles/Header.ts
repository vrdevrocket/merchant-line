import styled from "styled-components";
// import { theme } from "@utils";
export const StyledHeader = styled.div`
    .ant-layout-header {
        flex-direction: row;
        flex-wrap: nowrap;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* min-height: 5.5rem; */
        z-index: 11;
        padding: 0 32px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
        background-color: #ffffff;
        height: 88px;
        a {
            text-decoration: none;
            color: #ffffff;
            &:hover {
                color: #ffffff;
            }
        }
        .ant-menu {
            background-color: #ffffff;
        }
        .flex-layout {
            display: flex;
            align-items: center;
        }
        .header-logo {
            .future-layout {
                display: flex;
                align-items: center;
                .default-avatar {
                    width: 32px;
                    height: 32px;
                    min-width: 32px;
                    background: #e1e1e1;
                    padding: 6px;
                }
                .future-avatar {
                    width: 32px;
                    height: 32px;
                    min-width: 32px;
                }
                h4 {
                    margin: 0;
                    font-style: normal;
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 27px;
                    color: #000000;
                    padding-left: 12px;
                }
            }
        }
        .menu-title {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
            padding-left: 6px;
        }
        .count {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
            color: #000000;
            padding-left: 2px;
            .total-count {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #a5a5a5;
            }
        }
        .profile-title {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            .merchant-name {
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 27px;
                color: #000000;
                padding: 0 4px;
                margin: 0;
                max-width: 90px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .trigger {
        /* transform: rotate(90deg) translateX(4px); */
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
        margin-right: 64px;
        font-size: 1.25rem;
        white-space: nowrap;
        svg {
            fill: ${(props) => props.theme.colors.primary};
        }
        @media (min-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            margin-right: 0;
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
        padding: 0 1rem;
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
        svg {
            width: 32px;
            height: 32px;
        }
        span {
            /* text-transform: uppercase; */
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            padding-left: 4px;
            color: #000000;
            margin: 0;
        }
    }
    .brand {
        margin-right: 64px;
        img {
            height: 64px;
        }
    }
    .noti-menu {
        .ant-menu-submenu-title {
            padding-right: 0;
        }
    }
    .lang-menu {
        .ant-menu-submenu-title {
            /* padding-left: 0; */
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .future-layout {
            display: none !important;
        }
        .user-count {
            display: none !important;
        }
        .transaction-count {
            display: none !important;
        }
        .count-divider {
            display: none !important;
        }
        .notification-menu {
            svg {
                width: 24px;
                height: 24px;
            }
        }
        .setting-icon {
            svg {
                width: 24px;
                height: 24px;
            }
        }
        .lang-title {
            display: block;
            svg {
                width: 24px;
                height: 24px;
            }
            .text {
                display: none;
            }
        }
        .ant-menu-submenu-title {
            padding: 0 12px;
        }
        .ant-avatar-image {
            width: 32px !important;
            height: 32px !important;
            /* margin-right: 4px; */
        }
        .merchant-name {
            display: none;
        }
        .profile-divider {
            top: 20px;
            margin: 0;
        }
        .ant-layout-header {
            min-height: 54px;
            height: 54px;
        }
        .brand {
            margin-right: 0;
            img {
                height: 32px;
            }
        }
        .ant-layout-header {
            padding: 0 16px;
        }
        .ant-menu-submenu-title {
            padding: 0 6px;
        }
        .profile-title {
            padding-bottom: 0 !important;
            margin-bottom: 17px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .ant-layout-header {
            padding: 0 14px;
            .header-logo {
                flex: 1;
            }
            .small-logo {
                flex: 1;
            }
            .mobile-right-menu {
                flex: 1;
                display: flex;
                justify-content: end;
                .profile-menu {
                    display: flex;
                    align-items: center;
                    .profile-title {
                        margin: 0;
                        .dropdown {
                            display: none;
                        }
                    }
                }
            }
        }
        .ant-menu-submenu-title {
            svg {
                width: 20px;
                height: 20px;
            }
        }
    }
`;

export const StyledNotification = styled.div`
    .ant-list-item {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    .mobile-menu-item {
        color: white !important;
    }
`;
