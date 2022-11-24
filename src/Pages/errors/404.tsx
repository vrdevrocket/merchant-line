import styled from "styled-components";
import { Button } from "antd";
import { useHistory } from "react-router";

import { PATH_HOME } from "@configs";

export const PageError404 = () => {
    const history = useHistory();
    const routeHome = () => {
        history.push(PATH_HOME);
    };
    const routeBack = () => {
        history.goBack();
    };
    return (
        <StyledContainer>
            <div className="not-found">
                <img className="img" src={"/images/img_404.png"} alt="not-found" />
            </div>
            <div className="button-field">
                <Button type="primary" onClick={() => routeHome()} className="btn-home btn">
                    Go Home
                </Button>
                <Button type="default" onClick={() => routeBack()} className="btn-back btn">
                    Back
                </Button>
            </div>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .not-found {
        max-width: 100vw;
        position: relative;
    }
    .img {
        object-fit: contain;
        object-position: center;
        width: 50vw;
        height: auto;
        @media (max-width: 576px) {
            width: 100vw;
        }
    }
    .button-field {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 32px;
        .btn {
            font-size: 24px;
            height: auto;
            margin: 0 4px;
            min-width: 140px;
        }
        .btn-home {
        }
        .btn-back {
            width: 100%;
        }
    }
`;
