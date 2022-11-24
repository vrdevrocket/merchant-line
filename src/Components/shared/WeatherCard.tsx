import {
    ArrowDown,
    ArrowDownLeft,
    ArrowDownRight,
    ArrowLeft,
    ArrowRight,
    ArrowUp,
    ArrowUpLeft,
    ArrowUpRight,
} from "react-feather";
import { Card, Col, Divider, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import format from "date-fns/format";

import { capitalize, getWeather, getWeatherIcon, windDirection } from "@utils";

const DescriptionItem = ({ title, content }: { title: string; content: string }) => (
    <Row type="flex" align="middle" justify="space-between" className="mb-2">
        <span>{title}</span>
        <small>{content}</small>
    </Row>
);

const ForecastItem = ({ content }: { content: JSX.Element | undefined | string }) => (
    <span
        style={{
            display: "block",
        }}
    >
        {content}
    </span>
);

const getWindDirection = (degree: number) => {
    const direction = windDirection(degree);
    switch (direction) {
        case "n":
            return <ArrowUp size={20} strokeWidth={1} />;
        case "ne":
            return <ArrowUpRight size={20} strokeWidth={1} />;
        case "e":
            return <ArrowRight size={20} strokeWidth={1} />;
        case "se":
            return <ArrowDownRight size={20} strokeWidth={1} />;
        case "s":
            return <ArrowDown size={20} strokeWidth={1} />;
        case "sw":
            return <ArrowDownLeft size={20} strokeWidth={1} />;
        case "w":
            return <ArrowLeft size={20} strokeWidth={1} />;
        case "nw":
            return <ArrowUpLeft size={20} strokeWidth={1} />;
        default:
            break;
    }
};

interface IProps {
    city: string;
    country: string;
    days: number;
}

export const SharedWeatherCard = ({ city, country, days }: IProps) => {
    const [current, setCurrent] = useState<any>();
    const [forecast, setForecast] = useState<any>();

    useEffect(() => {
        (async function () {
            try {
                const forecast = await getWeather(city, country, days);

                if (forecast) {
                    const current = forecast.list[0];
                    setCurrent(current);
                    setForecast(forecast);
                }
            } catch (e) {
                // eslint-disable-next-line 
                console.error(e);
            }
        })();
    }, [city, country, days]);

    return (
        <Card bodyStyle={{ padding: 0 }} className="mb-4">
            <Skeleton loading={!current && !forecast} active className="p-4">
                {current && (
                    <>
                        <div className="p-4">
                            <Row
                                type="flex"
                                align="middle"
                                justify="space-between"
                                className="mb-4"
                            >
                                <Col>
                                    {forecast && (
                                        <h5 className="mb-0 font-weight-bold">{`${forecast.city.name}, ${forecast.city.country}`}</h5>
                                    )}
                                    <h6 className="mb-0">
                                        {format(current.dt * 1000, "MMMM Do YYYY")}
                                    </h6>
                                    <small>{capitalize(current?.weather[0].description)}</small>
                                </Col>
                                <Col className="text-right">
                                    <h3 className="font-weight-light mb-0">
                                        <span>{current.main.temp}&deg;</span>
                                    </h3>
                                </Col>
                            </Row>
                            <Row type="flex" align="middle" justify="space-between" gutter={16}>
                                {Object.keys(current.main).map((key, index) => (
                                    <Col xs={12} key={index}>
                                        <DescriptionItem
                                            title={capitalize(key.replace(/_/g, " "))}
                                            content={current.main[key]}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <Divider orientation="left">
                            <small>Forecast</small>
                        </Divider>
                        <div className="p-4">
                            {forecast && (
                                <Row
                                    type="flex"
                                    align="middle"
                                    justify="space-between"
                                    className="text-center"
                                    style={{ flexFlow: "initial" }}
                                >
                                    {forecast.list.map(
                                        (day: any, index: number) =>
                                            index !== 0 && (
                                                <p className="text-center mb-0" key={index}>
                                                    <ForecastItem
                                                        content={format(day.dt * 1000, "ddd")}
                                                    />
                                                    <ForecastItem
                                                        content={day.weather.description}
                                                    />
                                                    <ForecastItem
                                                        content={getWindDirection(day.wind.deg)}
                                                    />
                                                    <ForecastItem
                                                        content={getWeatherIcon(
                                                            day.weather[0].icon,
                                                            50
                                                        )}
                                                    />
                                                    <ForecastItem content={`${day.main.temp}°`} />
                                                </p>
                                            )
                                    )}
                                </Row>
                            )}
                        </div>
                    </>
                )}
            </Skeleton>
        </Card>
    );
};
