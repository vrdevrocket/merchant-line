import { Card, Icon } from "antd";
import styled from "styled-components";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useEffect, useState, memo } from "react";
// import { useTranslation } from "react-i18next";
import { Skeleton } from "@mui/material";

import { IconEmptyBox } from "@components";
import { IChartData, IIconStat } from "@interfaces";
import { numberFormatter } from "@utils";

interface IProps {
    icon: IIconStat;
    title: string;
    data?: IChartData[];
    isLoading: boolean;
    units?: string;
}

export const ComponentCardStat = memo((props: IProps) => {
    // page hook
    // const { t } = useTranslation();
    //page variable
    const { data, title, isLoading, units } = props;
    //page state

    const [chartData, setChartData] = useState<number[]>([]);
    const [lineData, setLineData] = useState<{ value: number }[]>([]);
    useEffect(() => {
        const arr: number[] = [];
        data?.map((item) => {
            arr.push(item.value);
        });
        setChartData(arr);
    }, [data]);

    useEffect(() => {
        if (chartData.length > 0) {
            const min = Math.min(...chartData);
            const arr: { value: number }[] = [];
            data?.map((item) => {
                arr.push({ value: item.value - min });
            });
            setLineData(arr);
        }
    }, [chartData]);

    const upStock = () => {
        if (chartData[0] > 0 && chartData[chartData.length - 1] > 0) {
            if (chartData[chartData.length - 1] > chartData[0]) {
                return (
                    ((chartData[chartData.length - 1] - chartData[0]) / chartData[0]) *
                    100
                ).toFixed(2);
            } else
                return (
                    ((chartData[0] - chartData[chartData.length - 1]) /
                        chartData[chartData.length - 1]) *
                    100
                ).toFixed(2);
        } else return "0.00%";
    };

    return (
        <StyledContainer>
            <Card className="card">
                <div>
                    {chartData && (
                        <ResponsiveContainer width={120} height={32}>
                            <LineChart data={lineData}>
                                <Line
                                    type="monotone"
                                    dot={false}
                                    dataKey="value"
                                    stroke={
                                        chartData[0] > chartData[chartData.length - 1]
                                            ? "#F22F46"
                                            : "#6CD14E"
                                    }
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
                <div className="card-title">
                    {/* <div>
                        <IconStat type={icon.type} />
                    </div> */}
                    <h5>{title}</h5>
                </div>
                {isLoading ? (
                    <>
                        <Skeleton variant="rectangular" style={{ margin: "20px 0" }} />
                        <Skeleton variant="rectangular" style={{ margin: "20px 0" }} />
                        <Skeleton variant="rectangular" style={{ margin: "20px 0" }} />
                    </>
                ) : data && data.length > 0 ? (
                    <>
                        <div className="card-value">
                            <div className="count eng">
                                {numberFormatter(chartData[chartData.length - 1])}
                                <small>{units}</small>
                            </div>
                            <div
                                className={
                                    chartData[0] > chartData[chartData.length - 1]
                                        ? "stock stock-down"
                                        : "stock stock-up"
                                }
                            >
                                <Icon type="caret-up" />
                                <div className="percent eng">
                                    {upStock()}
                                    {chartData[0] !== 0 && "%"}
                                </div>
                            </div>
                        </div>
                        {/* <div className="date-line">{t("page.vs_7_day_ago")}</div> */}
                    </>
                ) : (
                    <div className="empty-field">
                        <IconEmptyBox />
                        <p>Information will be shown here</p>
                    </div>
                )}
            </Card>
        </StyledContainer>
    );
});

const StyledContainer = styled.div`
    height: 100%;
    /* height: 252px; */
    .ant-card {
        height: 100%;
        border-radius: 8px;
        .ant-card-body {
            height: 100%;
            padding: 24px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .empty-field {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        p {
            color: #a5a5a5;
            font-size: 14;
            text-align: center;
        }
    }
    .card {
        .card-title {
            display: flex;
            min-height: 54px;
            h5 {
                font-style: normal;
                font-weight: 400;
                font-size: 20px;
                line-height: 27px;
                color: #000000;
            }
        }
        .card-value {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            overflow: hidden;
            .count {
                font-weight: 700;
                font-size: 25px;
                line-height: 34px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #000000;
                small {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                    padding: 2px 4px;
                }
            }
            .stock {
                display: flex;
                align-items: center;
                .percent {
                    font-size: 21px;
                }
            }
            .stock-up {
                svg,
                .percent {
                    color: #6cd14e;
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 16px;
                }
            }
            .stock-down {
                svg,
                .percent {
                    color: #f22f46;
                }
                svg {
                    transform: rotate(180deg);
                }
            }
        }
        .date-line {
            color: ${(p) => p.theme.colors.fadedText};
            font-size: 12px;
            margin-bottom: 10px;
        }
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .ant-card {
            .ant-card-body {
                padding: 20px 16px;
            }
        }
    }
`;
