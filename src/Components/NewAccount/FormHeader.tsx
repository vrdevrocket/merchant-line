import { Layout, Steps } from "antd";
import styled from "styled-components";
import { LogoRocket, StepColor } from "@components";

const { Header } = Layout;
const { Step } = Steps;
interface Iprops {
    current?: number;
    stepLen: number[];
}

export const FormHeader = (props: Iprops) => {
    const { current, stepLen } = props;

    const getSteperIcon = (num: number) => {
        if (current === num) {
            return <StepColor />;
        }
    };

    return (
        <Header className="main-content-header">
            <LogoRocket />
            <StyledStepper>
                <Steps current={current}>
                    {stepLen.map((item) => (
                        <Step icon={getSteperIcon(item)} key={item} />
                    ))}
                </Steps>
            </StyledStepper>
        </Header>
    );
};

const StyledStepper = styled.div`
    /* width: 132px; */
    .ant-steps {
        width: auto;
    }
    .ant-steps-item:last-child {
        padding-right: 4px;
    }
    .ant-steps-item {
        margin-right: -4px !important;
        margin-left: -1px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px;
        border-radius: 16px;
        .ant-steps-item-title {
            &::after {
                left: -1px;
                top: -1px;
                height: 3px;
            }
        }
    }
    .ant-steps-item-icon {
        line-height: 0;
    }
    .ant-steps-item-process {
        .ant-steps-item-title {
            &::after {
                left: 1px;
                /* left: -5px; */
                height: 3px;
                background-color: #e1e1e1;
            }
        }
        .ant-steps-icon {
            width: 20px !important;
            height: 20px !important;
            line-height: 0;
            svg {
                /* width: 24px !important;
                height: 24px !important; */
                box-shadow: 0px 0px 5px rgb(230 29 52 / 69%);
                background: #feb5bd;
                border-radius: 10px;
            }
        }
        .ant-steps-item-icon {
            margin: 0;
            /* padding: 6px; */
            border-radius: 10px;
            /* background: red;
            border-color: red; */
        }
    }
    // finish step
    .ant-steps-item-finish {
        /* margin-right: -5px !important; */
        .ant-steps-item-title {
            &::after {
                /* left: -1px; */
                /* left: 1px; */
                top: -1px;
                height: 3px;
                background-color: #f22f46;
            }
        }
        .ant-steps-item-icon {
            background: #f22f46;
            border-color: #f22f46;
            width: 20px;
            height: 20px;
        }
        .ant-steps-item-icon {
            margin-right: -1px;
            .ant-steps-icon {
                display: none;
                i {
                    display: none;
                }
            }
        }
    }
    // waiting
    .ant-steps-item-wait {
        .ant-steps-item-title {
            &::after {
                /* left: 1px; */
                /* left: -5px; */
                height: 3px;
                background-color: #e1e1e1;
            }
        }
        .ant-steps-item-icon {
            margin-right: 0;
            .ant-steps-icon {
                display: none;
                i {
                    display: none;
                }
            }
        }
        .ant-steps-item-icon {
            background: #e1e1e1;
            border-color: #e1e1e1;
            width: 20px;
            height: 20px;
        }
    }
    .steps-action {
        margin-top: 24px;
    }
`;
