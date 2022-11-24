import styled from "styled-components";

export const TransparentClipPath = () => {
    return (
        <StyledContainer>
            <div className="left-item">
                <div className="center-item" />
            </div>
            <div className="right-item" />
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 21px;
    height: 21px;
    position: relative;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &:active {
        transform: scale(0.95);
    }
    .left-item {
        padding: 0 3px 3px 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        background-color: #f5f5f5;
        z-index: 1;
    }
    .center-item {
        border: 1px #646464 solid;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .right-item {
        border: 1px #646464 solid;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 15px;
        height: 15px;
    }
`;
