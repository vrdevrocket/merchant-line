import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
interface IProps {
    text: string;
}

export const PlanFeatureCheck = (props: IProps) => {
    const { text } = props;
    return (
        <div className="feature-item item-check">
            <CheckCircleFilled /> <p>{text}</p>
        </div>
    );
};

export const PlanFeatureClose = (props: IProps) => {
    const { text } = props;
    return (
        <div className="feature-item item-close">
            <CloseCircleFilled /> <p>{text}</p>
        </div>
    );
};
