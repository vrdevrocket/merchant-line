import { Col, Row } from "antd";
import moment from "moment";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { SharedDate, SharedTime } from "../";
import { IDate, ILimitDate, IDataDate } from "@interfaces";
import styled from "styled-components";

interface IProps {
    dateFrom: Date | string;
    dateTo: Date | string;
    handleDateFrom: (date: Date) => void;
    handleDateTo: (date: Date) => void;
    limitDate?: ILimitDate;
}

const DATE_FORMAT = "YYYY-MM-DD";
const TIME_FORMAT = "HH:mm";

const convertDate = (date: Date | string) => {
    const momentDate = moment(date);
    const convertDate: IDate = {
        date: momentDate.format(DATE_FORMAT),
        time: momentDate.format(TIME_FORMAT),
    };

    return convertDate;
};

export const ComponentPeriod = memo((props: IProps) => {
    //props
    const { dateFrom, dateTo, handleDateFrom, handleDateTo } = props;

    //hooks
    const { t } = useTranslation();
    //page variable
    const selectedDate: IDataDate = {
        from: convertDate(dateFrom),
        to: convertDate(dateTo),
    };

    // const disableDateFrom = new Date(dateFrom);
    const disableDateTo = moment(new Date(dateFrom)).add(1, "days").toDate();

    const handleChangeDateFrom = (date: moment.Moment) => {
        if (date) {
            handleDateFrom(date.startOf("days").add(selectedDate.from.time).toDate());
        }
    };

    const handleChangeDateTo = (date: moment.Moment) => {
        if (date) {
            handleDateTo(date.startOf("days").add(selectedDate.from.time).toDate());
        }
    };

    const handleChangeTimeFrom = (date: moment.Moment) => {
        handleDateFrom(
            moment(selectedDate.from.date).startOf("days").add(date.format(TIME_FORMAT)).toDate()
        );
    };

    const handleChangeTimeTo = (date: moment.Moment) => {
        // handleDateTo(new Date(selectedDate.to.date + " " + date.format(TIME_FORMAT)));
        handleDateTo(
            moment(selectedDate.from.date).startOf("days").add(date.format(TIME_FORMAT)).toDate()
        );
    };
    return (
        <StyledSelectDateTime>
            <div className="label">{t("page.validity_period")}</div>
            <StyledRow type="flex" align="middle" gutter={10}>
                <Col xs={3} sm={3} md={4}>
                    <StyledDateLabel>{t("page.from")}</StyledDateLabel>
                </Col>
                <Col xs={10} sm={10} md={8}>
                    <SharedDate
                        onChange={handleChangeDateFrom}
                        value={selectedDate.from.date}
                        // disableDateBefore={disableDateFrom}
                    />
                </Col>
                <Col xs={10} sm={10} md={8}>
                    <SharedTime
                        className="eng"
                        onChange={handleChangeTimeFrom}
                        time={selectedDate.from.time}
                    />
                </Col>
            </StyledRow>
            <StyledRow type="flex" align="middle" gutter={10}>
                <Col xs={3} sm={3} md={4}>
                    <StyledDateLabel>{t("page.till")}</StyledDateLabel>
                </Col>
                <Col xs={10} sm={10} md={8}>
                    <SharedDate
                        onChange={handleChangeDateTo}
                        value={selectedDate.to.date}
                        disableDateBefore={disableDateTo}
                    />
                </Col>
                <Col xs={10} sm={10} md={8}>
                    <SharedTime
                        className=" eng"
                        onChange={handleChangeTimeTo}
                        time={selectedDate.to.time}
                    />
                </Col>
            </StyledRow>
        </StyledSelectDateTime>
    );
});

const StyledSelectDateTime = styled.div`
    margin-top: 58px;
    margin-bottom: 16px;
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        margin-top: 42px;
    }
    .label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        color: #000000;
        margin-bottom: 8px;
        display: inline-block;
    }
    .mb-16 {
        margin-bottom: 12px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        .label {
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 19px;
            color: #000000;
        }
    }
`;

const StyledDateLabel = styled.span`
    display: inline-block;
    min-width: 100px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.5em;
    margin-bottom: 16px;
    color: #000000;
    @media (max-width: ${(p) => p.theme.breakPoints.breakOnlyMobile}) {
        font-size: 14px;
    }
    @media (max-width: ${(p) => p.theme.breakPoints.breakTablet}) {
        margin-bottom: 24px;
    }
`;

const StyledRow = styled(Row)`
    margin-bottom: 1em;
`;
