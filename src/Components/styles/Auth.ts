import styled from "styled-components";

export const StyledAuth = styled.div<{ notImage?: boolean }>`
    position: relative;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    /* background: ${(p) => (p.notImage ? "#fff" : 'url("/images/backgroundAuth.png")')}; */
    /* display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom; */
    /* height: 98vh; */
    /* overflow-y: scroll; */
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        display: block;
        width: initial;
        height: initial;
        min-width: initial;
    }
    .bg-image__leftBottom {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 419px;
        height: 321px;
        object-fit: cover;
        @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
            width: 300px;
            height: 230px;
        }
    }
    .bg-image__rightBottom {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 483px;
        height: 360px;
        object-fit: cover;
        @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
            width: 345px;
            height: 268px;
        }
    }

    @media (max-width: ${(p) => p.theme.breakPoints.breakIpadPro}) {
        background-image: initial;
    }
`;

export const StyledContentAuth = styled.div<{ notImage?: boolean }>`
    /* background-color: #fff; */
    /* position: relative; */
    /* padding: ${(p) => (p.notImage ? "0 !important" : "initial")}; */
    /* padding: 60px 80px; */
    /* margin-top: 150px; */
    /* margin-bottom: 15px; */
    .ant-form-item-control {
        height: 75px;
    }
    .bg-image__logo {
        position: absolute;
        top: 0;
        left: 35px;
        width: 104px;
        height: 104px;
        transform: translateY(-50%);
        @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
            width: 84px;
            height: 84px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 40px 50px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        padding: 16px;
        padding-bottom: 0;
    }
`;

export const StyledExternalAuth = styled.div`
    column-count: 3;
    column-gap: 5px;
    max-width: 450px;
    margin: auto;
    min-height: 62px;
    padding: 10px 0;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        column-gap: 8px;
        min-height: 40px;
    }
`;
