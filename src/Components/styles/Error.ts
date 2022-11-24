import styled from "styled-components";

export const StyledError = styled.div<{ visible?: boolean }>`
    text-align: left;
    color: ${(props) => props.theme.colors.red};
    visibility: ${(p) => (p.visible ? "visible" : "hidden")};
    font-size: 11px;
    font-weight: 700;
    /* line-height: 20px; */
`;
