import { number } from "prop-types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
interface Iprops {
    countValue: number;
    color: string;
    title: string;
    limit: number | string;
    percentage: number;
}
export const ModuleCircularProgress = (props: Iprops) => {
    const { countValue, color, title, limit, percentage } = props;
    const { t } = useTranslation();
    return (
        <StyledLayout color={color}>
            <div className="progress-layout">
                <CircularProgressbar
                    value={percentage}
                    strokeWidth={14}
                    styles={buildStyles({
                        pathColor: color,
                        trailColor: "#f0f2f5",
                    })}
                />
                <div className="count-value">{countValue}</div>
            </div>
            <div className="count">
                <p className="title">{title}</p>
                <p className="limit">{t("page.limit_amount", { value: limit })}</p>
            </div>
        </StyledLayout>
    );
};
const StyledLayout = styled.div<{ color: string }>`
    display: flex;
    column-gap: 16px;
    align-items: center;
    height: 100%;
    background: #fff;
    border: 14px;
    padding: 20px 32px;
    border-radius: 8px;
    .progress-layout {
        position: relative;
        flex: 1;
        svg {
            width: 136.42px;
            height: 133px;
        }
        .count-value {
            position: absolute;
            top: 38%;
            left: 0;
            font-style: normal;
            font-weight: 700;
            font-size: 25px;
            line-height: 34px;
            color: #000000;
            min-width: 136px;
            text-align: center;
        }
    }
    .count {
        flex: 2;
        .title {
            color: ${(p) => p.color};
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 27px;
        }
        .limit {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #a5a5a5;
            margin-bottom: 0px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        flex-direction: column;
        padding: 20px 16px;
        .count {
            text-align: center;
            .title {
                font-size: 16px;
            }
        }
        .progress-layout {
            svg {
                width: 100px !important;
                height: 100px !important;
            }
            .count-value {
                min-width: 100px;
            }
        }
    }
`;
