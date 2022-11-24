import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-color: #f0f0f0;
    &.boxed {
        overflow: hidden;
        margin-right: auto;
        margin-left: auto;
    }
    @media (min-width: 992px) {
        &.boxed {
            max-width: 95%;
        }
    }
    .workspace {
        /* height: calc(100vh - 128px); */
        height: 100%;
        width: 100%;
        display: flex;
        position: relative;
        overflow: hidden;
        max-width: 100%;
        flex-grow: 1;
        flex-direction: row;
    }
    .workspace > .ant-layout {
        overflow-x: hidden;
    }
    .side-bar-menu {
        overflow: auto;
        height: 100%;
        background-color: white;
    }
`;

export const StyledPageInner = styled.div`
    margin: 0 auto;
    /* padding: 1.5rem; */
    /* display: flex; */
    position: relative;
    background-color: #f0f0f0;
    /* min-height: ${(props) => `calc(100vh - ${props.theme.header.height})`}; */
    /* min-height: 100%; */
    /* height: 100vh; */
    overflow-y: hidden;
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    ::-webkit-scrollbar-track {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        background: ${(p) => p.theme.colors.fadedText};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        cursor: grab;
    }
`;
