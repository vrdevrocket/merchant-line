interface IProps {
    color?: string;
}
import styled from "styled-components";
import {
    LeftTopInner,
    LeftTopOuter,
    RightBottom,
    RightBottomInner,
    SpotLayer,
    SpotLeftLayer,
} from "./icon";

export const PreviewBanner = (props: IProps) => {
    const { color } = props;
    return (
        <>
            <StyledLeftSide>
                <StyledInnerLayout>
                    <LeftTopInner />
                    <LeftTopOuter color={color} />
                    <SpotLeftLayer />
                </StyledInnerLayout>
            </StyledLeftSide>
            <StyledRightSide>
                <StyledInnerLayout>
                    <SpotLayer />
                    <RightBottomInner />
                    <RightBottom />
                </StyledInnerLayout>
            </StyledRightSide>
        </>
    );
};
const StyledLeftSide = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 45%;
    height: 100%;
`;
const StyledRightSide = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 55%;
    height: 100%;
`;
const StyledInnerLayout = styled.div`
    width: 100%;
    height: 100%;
    .spot {
        position: absolute;
        bottom: 22px;
        right: 2px;
    }
    .rightBottomInner {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .rightBottom {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .spotLeftLayer {
        position: absolute;
        bottom: 0;
        left: -3px;
    }
    .leftTopInner {
        position: absolute;
        left: 0;
        top: 0;
    }
    .leftTopOuter {
        position: absolute;
        left: 0;
        top: 0;
    }
`;
