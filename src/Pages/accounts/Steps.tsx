import styled from "styled-components";
import { Steps, Popover } from "antd";
import { useTranslation } from "react-i18next";
const { Step } = Steps;

const steps = [
    {
        content: "enter_company_info",
        number: 1,
    },
    {
        content: "confirm_info",
        number: 2,
    },
    {
        content: "complete",
        number: 3,
    },
];
interface Iprops {
    step: number;
}
export const ModuelSteps = (props: Iprops) => {
    const { step } = props;
    const { t } = useTranslation();
    return (
        <StyledLayout>
            <Steps current={step} progressDot={customDot}>
                {steps.map((item) => (
                    <Step key={item.content} title={t(`page.manage_account.${item.content}`)} />
                ))}
            </Steps>
        </StyledLayout>
    );
};
const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                step {index} status: {status}
            </span>
        }
    >
        <span className="step-icon">{index + 1}</span>
    </Popover>
);
const StyledLayout = styled.div`
    .ant-steps-item-tail {
        top: 32px;
        left: -16px;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            top: 21px;
            left: -40px;
        }
        &::after {
            border-bottom: 3px dotted #a5a5a5;
            border-radius: 0;
        }
    }
    .ant-steps-item-icon {
        width: 64px !important;
        height: 64px !important;
        background: #fff;
        margin-left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
            width: 42px !important;
            height: 42px !important;
        }
        .ant-steps-icon {
            .step-icon {
                font-style: normal;
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                text-align: center;
                color: #6c7084;
            }
        }
    }
    .ant-steps-item-content {
        position: absolute;
        left: -39px;
        text-align: center;
        .ant-steps-item-title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            text-align: center;
            color: #000000;
        }
    }
    .ant-steps-item-process {
        .ant-steps-item-icon {
            background: #0263e0;

            .ant-steps-icon {
                .step-icon {
                    color: #fff;
                }
            }
        }
    }
    .ant-steps-item-finish {
        .ant-steps-item-tail {
            &::after {
                background-color: #e8e8e8;
            }
        }
    }
`;
