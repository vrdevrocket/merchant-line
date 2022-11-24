import styled from "styled-components";

export const StyledProfileSidebar = styled.div`
    height: 100%;
    display: flex;
    overflow: auto;

    ::-webkit-scrollbar {
        /* width: 8px;
            height: 8px; */
        display: none;
    }
    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
    }

    ::-webkit-scrollbar-thumb:hover {
        cursor: grab;
    }
    .ant-layout-sider {
        z-index: 10;
    }
    .ant-menu-item > a {
        display: flex;
        align-items: center;
    }
    .ant-menu-item .anticon,
    .ant-menu-submenu-title .anticon {
        margin-right: 1rem;
    }
    .ant-layout-sider-zero-width-trigger {
        z-index: 9;
    }
    .ant-menu-inline-collapsed .ant-badge {
        max-width: 0;
        display: inline-block;
        opacity: 0;
    }
    .ant-menu-inline .ant-menu-item,
    .ant-menu-inline .ant-menu-submenu-title {
        width: calc(100%);
    }
    .ant-menu-submenu-title {
        padding-left: 0px !important;
        height: 52px !important;
        line-height: 52px !important;
        border-bottom: 1px solid #e1e1e1;
    }
    /* .user_info,
    .manage_permissions,
    .settings,
    .payments,
    .pricing_features,
    .loyalty_features,
    .loyalty,
    .gain_friends,
    .set_theme,
    .points {
        .ant-menu-submenu-title {
            border-bottom: 0;
        }
    } */
    @media (max-width: 768px) {
        .loyalty {
            .ant-menu-submenu-title {
                /* border-bottom: 1px solid #e1e1e1; */
            }
        }
    }
    .ant-menu-item {
        padding-left: 0px !important;
        margin-bottom: 8px !important;
    }
    .ant-menu-sub.ant-menu-inline {
        padding-left: 18px;
    }
    .ant-menu-item-selected {
        /* background-color: transparent !important; */
        border-radius: 8px;
        background-color: #f7f7f8 !important;
        span {
            color: #f22f46 !important;
        }
        &::after {
            visibility: hidden !important;
        }
    }
    .ant-menu-submenu-arrow {
        &::after {
            display: none;
        }
        &::before {
            width: 0;
            height: 0;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            border-top: 7px solid rgb(242, 47, 70);
        }
    }
    .ant-menu-submenu-open.ant-menu-submenu-inline
        > .ant-menu-submenu-title
        .ant-menu-submenu-arrow:before {
        transform: rotate(180deg) !important;
    }
    .ant-menu-submenu-inline > .ant-menu-submenu-title .ant-menu-submenu-arrow:before {
        transform: rotate(0) !important;
    }
    .sidebar-wrap {
        padding: 20px 39px 10px 39px;
    }
    .ant-menu-submenu {
        &.manage_permissions,
        &.payments,
        &.first_menu,
        &.store_front,
        &.contact,
        &.gain_friends,
        &.pricing_features,
        &.set_theme {
            .ant-menu-submenu-arrow {
                &::before {
                    display: none;
                }
            }
        }
    }
    .sidebar-layout {
        display: flex;
        align-items: center;
        white-space: nowrap;
        padding: 12px 0;
        /* justify-content: space-between; */
        .future-avatar {
            width: 36px;
            height: 36px;
            min-width: 36px;
            /* border-radius: 50%; */
            /* border: 1px solid; */
        }
        .email-layout {
            margin-left: 8px;
            h4 {
                font-style: normal;
                font-weight: 700;
                font-size: 16px;
                line-height: 22px;
                color: #000000;
                margin: 0;
                overflow: hidden;
                max-width: 205px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            p {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                color: #a5a5a5;
                margin: 0;
                overflow: hidden;
                max-width: 205px;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .profile-divider {
        margin: 0;
    }
    .profile-layout {
        border: 0;
        .ant-menu-item {
            padding-left: 0;
        }
    }
`;
