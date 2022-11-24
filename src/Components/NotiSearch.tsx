import React from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchIcon } from "./icon";
interface IInput {
    onChange: (e) => void;
}
export const NotiSearch = (props: IInput) => {
    const { onChange } = props;
    return (
        <StyledLayout>
            <StyledIcon>
                <SearchIcon />
            </StyledIcon>

            <Input placeholder="Ticket No, Phone, User Id " onChange={onChange} />
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    position: relative;
    input {
        padding-left: 30px;
        color: #646464;
        font-size: 16px;
    }
`;
const StyledIcon = styled.span`
    position: absolute;
    top: 13px;
    left: 10px;
    z-index: 1;
`;
