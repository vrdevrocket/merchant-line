import { Skeleton } from "antd";
import styled from "styled-components";

export const SharedSkeleton = () => {
    return (
        <StyledContainer>
            <Skeleton></Skeleton>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    background-color: white;
`;
