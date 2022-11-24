import styled from "styled-components";

export const IconCheck = () => {
    return (
        <StyledCheck>
            <svg
                width="13"
                height="11"
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0.685059 6.01239L4.21306 10.0694L12.2771 0.796387"
                    stroke="white"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </StyledCheck>
    );
};

export const IconNotCheck = () => {
    return (
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M14.4178 0.266113C17.169 0.266113 19.8583 1.08192 22.1458 2.61037C24.4333 4.13882 26.2162 6.31127 27.269 8.85299C28.3218 11.3947 28.5973 14.1915 28.0605 16.8898C27.5238 19.5881 26.199 22.0666 24.2537 24.012C22.3083 25.9573 19.8298 27.2821 17.1315 27.8188C14.4332 28.3556 11.6364 28.0801 9.09469 27.0273C6.55297 25.9745 4.38052 24.1916 2.85207 21.9041C1.32362 19.6166 0.507813 16.9273 0.507812 14.1761C0.507813 10.487 1.97333 6.94889 4.58196 4.34026C7.19059 1.73163 10.7287 0.266113 14.4178 0.266113V0.266113Z"
                fill="#0263E0"
            />
            <path
                d="M19.0542 9.54004L9.78125 18.813"
                stroke="white"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.0472 18.806L9.78125 9.54004"
                stroke="white"
                strokeWidth="1.3"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const StyledCheck = styled.div`
    background: #0263e0;
    width: 27.82px;
    height: 27.82px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ground {
        height: 9.265999794006348px;
        width: 9.265999794006348px;
        position: relative;
        &::after {
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            background-color: #ffffff;
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        &::before {
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            top: 0;
            left: 50%;
            background-color: #ffffff;
            -ms-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }
    }
`;
