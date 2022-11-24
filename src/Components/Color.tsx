import styled from "styled-components";

interface IProps {
    color: string;
    onClick?: (color?: string) => void;
    className?: string;
}

export const ComponentColor = (props: IProps) => {
    const { color, onClick, className } = props;
    return (
        <StyledColor
            className={className}
            color={color}
            onClick={() => {
                if (onClick) {
                    onClick(color);
                }
            }}
        ></StyledColor>
    );
};

const StyledColor = styled.div<{ color: string }>`
    background-color: ${(p) => p.color};
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 4px;
    cursor: pointer;
`;
