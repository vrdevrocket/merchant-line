import { useTranslation } from "react-i18next";
import { Input, Radio, Tooltip, DatePicker, Select } from "antd";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import { useEffect, useState } from "react";
import { CloseCircleFilled } from "@ant-design/icons";
import moment from "moment";

import {
    enumSegmentDataType,
    enumSegmentSubKey,
    SEGMENT_TYPE,
    enumSegmentCreateStep,
} from "@configs";
import { SharedButtonDefault } from "@components";
import { segmentAPI } from "@api";

interface IProps {
    data: IItem;
    backStep: (step: enumSegmentCreateStep) => void;
    saveData: (data: any) => void;
    indexArr: { child: number; parent: number };
    handleCancel: () => void;
    initValArr?: any;
}
interface IItem {
    title: string;
    key: string;
    type: enumSegmentDataType;
}
const maxLength = 9;

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
    fontSize: "16px",
    fontWeight: 500,
    color: "black",
};
const { RangePicker } = DatePicker;

// const fakeData = ["anme 1", "name 2", "asdf adsf dsf", "sdafcxvxcv dà"];

export const AddSegmentStepThree = (props: IProps) => {
    // page hook
    const { t } = useTranslation();
    //page state
    const [radioValue, setRadioValue] = useState(1);
    const [valArr, setValArr] = useState<(string | number)[]>([]);
    const [inputVal, setInputVal] = useState("");
    const [objData, setObjData] = useState();
    const [isErr, setIsErr] = useState<boolean>(true);
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [selectData, setSelectData] = useState<string[]>([]);
    //page variable
    const { data, backStep, saveData, handleCancel, initValArr } = props;
    const { type, key } = data;

    const fetchSelectData = async () => {
        const fetchCase = () => {
            if (key === "user.traffic.name") {
                return segmentAPI.getTrafficSource();
            } else if (key === "user.memberTier.tierName") {
                return segmentAPI.getMembershipTier();
            } else if (key.includes("form")) {
                const id = key.slice(5);
                return segmentAPI.getOption(id);
            } else return;
        };
        const response = await fetchCase();
        if (response && response.data) setSelectData(response.data);
    };

    useEffect(() => {
        fetchSelectData();
    }, []);

    // send initValues when edit
    useEffect(() => {
        if (initValArr) {
            const key = Object.keys(initValArr)[0];
            const values = Object.values(initValArr)[0];
            switch (key) {
                case enumSegmentSubKey.isEqualToAnyOf:
                case enumSegmentSubKey.isEqualToDate:
                case enumSegmentSubKey.isEqualToNumber:
                    setRadioValue(1);
                    break;
                case enumSegmentSubKey.containsAnyOf:
                case enumSegmentSubKey.isBefore:
                case enumSegmentSubKey.isGreaterThan:
                    setRadioValue(2);
                    break;
                case enumSegmentSubKey.isKnown:
                    setRadioValue(values ? 3 : 4);
                    break;
                case enumSegmentSubKey.isLessThan:
                case enumSegmentSubKey.isAfter:
                    setRadioValue(3);
                    break;
                case enumSegmentSubKey.isBetween:
                    setRadioValue(4);
                    break;
                default:
                    setRadioValue(1);
                    break;
            }

            if (Array.isArray(values)) setValArr(values);
            if (typeof values === "number") setValArr([values]);
        }
    }, [initValArr]);

    useEffect(() => {
        // x : subKey
        const x = checkType();
        // why: unknown obj
        const newObj: any = {};
        switch (type) {
            case enumSegmentDataType.text:
            case enumSegmentDataType.textIncluded:
                {
                    if (x === enumSegmentSubKey.isKnown) {
                        newObj[x] = true;
                        setIsErr(false);
                    } else if (x === enumSegmentSubKey.isUnknown) {
                        newObj[enumSegmentSubKey.isKnown] = false;
                        setIsErr(false);
                    } else if (!valArr.length) {
                        setIsErr(true);
                        break;
                    } else {
                        if (x) {
                            newObj[x] = valArr;
                            setIsErr(false);
                        }
                    }
                    //why: unknown obj
                    const parentObj: any = {};
                    parentObj[key] = newObj;
                    setObjData(parentObj);
                }
                break;

            case enumSegmentDataType.date:
                {
                    if (valArr.length && x) {
                        newObj[x] = valArr;
                        //why: unknown obj
                        const parentObj: any = {};
                        parentObj[key] = newObj;
                        setObjData(parentObj);
                        setIsErr(false);
                    } else {
                        setIsErr(true);
                    }
                }
                break;
            case enumSegmentDataType.number:
                {
                    if (valArr.length && x && Number(valArr[0]) >= 0) {
                        newObj[x] = Number(valArr[0]);
                        const parentObj: any = {};
                        parentObj[key] = newObj;
                        setObjData(parentObj);
                        setIsErr(false);
                    } else {
                        setIsErr(true);
                    }
                }
                break;
            // case enumSegmentDataType.textIncluded: {
            //     if (valArr.length && x) {
            //         setIsErr(false);
            //         newObj[x] = valArr;
            //         //why: unknown obj
            //         const parentObj: any = {};
            //         parentObj[key] = newObj;
            //         setObjData(parentObj);
            //     } else setIsErr(true);
            //     break;
            // }
        }
    }, [valArr]);

    const changeRadioVal = (e: RadioChangeEvent) => {
        setValArr([]);
        setRadioValue(e.target.value);
        setIsTouched(false);
    };

    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (inputVal) {
                setInputVal("");
                setValArr([...valArr, inputVal]);
            }
        }
    };

    const handleSave = () => {
        if (!isErr) saveData(objData);
        setIsTouched(true);
    };

    const removeItem = (index: number) => {
        setValArr([...valArr.filter((item, i) => i !== index && item)]);
    };

    const handleSelect = (value: string[]) => {
        setIsTouched(true);
        setValArr(value);
    };

    // what: check type of step 3. Why: make object to send callbackData
    const checkType = () => {
        switch (type) {
            case enumSegmentDataType.date:
                {
                    switch (radioValue) {
                        case SEGMENT_TYPE.date.isEqualTo:
                            return enumSegmentSubKey.isEqualToDate;
                        case SEGMENT_TYPE.date.isBefore:
                            return enumSegmentSubKey.isBefore;
                        case SEGMENT_TYPE.date.isAfter:
                            return enumSegmentSubKey.isAfter;
                        case SEGMENT_TYPE.date.isBetween:
                            return enumSegmentSubKey.isBetween;
                    }
                }
                break;
            case enumSegmentDataType.number:
                {
                    switch (radioValue) {
                        case SEGMENT_TYPE.number.isEqualTo:
                            return enumSegmentSubKey.isEqualToNumber;
                        case SEGMENT_TYPE.number.isGreaterThan:
                            return enumSegmentSubKey.isGreaterThan;
                        case SEGMENT_TYPE.number.isLessThan:
                            return enumSegmentSubKey.isLessThan;
                    }
                }
                break;
            case enumSegmentDataType.text:
            case enumSegmentDataType.textIncluded:
                {
                    switch (radioValue) {
                        case SEGMENT_TYPE.text.isEqualToAnyOf:
                            return "isEqualToAnyOf";
                        case SEGMENT_TYPE.text.containsAnyOf:
                            return "containsAnyOf";
                        case SEGMENT_TYPE.text.isKnown:
                            return "isKnown";
                        case SEGMENT_TYPE.text.isUnknown:
                            return "isUnknown";
                    }
                }
                break;
        }
    };

    const dateInput = (
        <DatePicker
            className={isTouched && isErr ? "date-input input-err" : "date-input"}
            placeholder="DD/MM/YYYY"
            format={"DD/MM/YYYY"}
            onChange={(date) => {
                switch (radioValue) {
                    case SEGMENT_TYPE.date.isEqualTo:
                        return setValArr([date.toString()]);
                    case SEGMENT_TYPE.date.isBefore:
                        return setValArr([date.startOf("days").toDate().toUTCString()]);
                    case SEGMENT_TYPE.date.isAfter:
                        return setValArr([date.endOf("days").toDate().toUTCString()]);
                }

                setValArr([date.toString()]);
            }}
            value={valArr[0] ? moment(new Date(valArr[0])) : undefined}
        />
    );

    const itemTextField = (
        <>
            <Radio.Group onChange={changeRadioVal} value={radioValue}>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isEqualToAnyOf}>
                        {t("page._is_equal_to_any_of")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.text.isEqualToAnyOf && (
                        <div
                            className={
                                isTouched && isErr ? "input-with-tag input-err" : "input-with-tag"
                            }
                        >
                            {valArr.map((item, index) => {
                                if (typeof item === "string" && item.length > 10)
                                    return (
                                        <Tooltip key={index} title={item}>
                                            <div className="tag">
                                                <div>{`${item.slice(0, maxLength)}...`}</div>
                                                <CloseCircleFilled
                                                    className="icon-remove"
                                                    onClick={() => removeItem(index)}
                                                />
                                            </div>
                                        </Tooltip>
                                    );
                                else
                                    return (
                                        <div key={index} className="tag">
                                            <div>{item}</div>
                                            <CloseCircleFilled
                                                onClick={() => removeItem(index)}
                                                className="icon-remove"
                                            />
                                        </div>
                                    );
                            })}
                            <Input
                                name="inputVal"
                                onChange={(e) => setInputVal(e.target.value)}
                                value={inputVal}
                                onKeyDown={handleEnter}
                            />
                        </div>
                    )}
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.containsAnyOf}>
                        {t("page._contains_any_of")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.text.containsAnyOf && (
                        <div
                            className={
                                isTouched && isErr ? "input-with-tag input-err" : "input-with-tag"
                            }
                        >
                            {valArr.map((item, index) => {
                                if (typeof item === "string" && item.length > 10)
                                    return (
                                        <Tooltip title={item}>
                                            <div key={index} className="tag">
                                                {`${item.slice(0, 9)}...`}
                                                <CloseCircleFilled
                                                    className="icon-remove"
                                                    onClick={() => removeItem(index)}
                                                />
                                            </div>
                                        </Tooltip>
                                    );
                                else
                                    return (
                                        <div key={index} className="tag">
                                            {item}
                                            <CloseCircleFilled
                                                className="icon-remove"
                                                onClick={() => removeItem(index)}
                                            />
                                        </div>
                                    );
                            })}
                            <Input
                                name="inputVal"
                                onChange={(e) => setInputVal(e.target.value)}
                                value={inputVal}
                                onKeyDown={handleEnter}
                            />
                        </div>
                    )}
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isKnown}>
                        {t("page._is_known")}
                    </Radio>
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isUnknown}>
                        {t("page._is_unknown")}
                    </Radio>
                </div>
            </Radio.Group>
        </>
    );
    const itemDateField = (
        <>
            <Radio.Group onChange={changeRadioVal} value={radioValue}>
                <div className="radio-field-date">
                    <Radio style={radioStyle} value={1}>
                        {t("page._is_equal_to")}
                    </Radio>
                    {radioValue === 1 && dateInput}
                </div>
                <div className="radio-field-date">
                    <Radio style={radioStyle} value={2}>
                        {t("page._is_before")}
                    </Radio>
                    {radioValue === 2 && dateInput}
                </div>
                <div className="radio-field-date">
                    <Radio style={radioStyle} value={3}>
                        {t("page._is_after")}
                    </Radio>
                    {radioValue === 3 && dateInput}
                </div>
                <div className="radio-field-calender">
                    <Radio style={radioStyle} value={4}>
                        {t("page._is_between")}
                    </Radio>
                    {radioValue === 4 && (
                        <RangePicker
                            value={
                                valArr.length === 2
                                    ? [moment(valArr[0]), moment(valArr[1])]
                                    : undefined
                            }
                            className={isTouched && isErr ? "input-err" : ""}
                            onChange={(date) =>
                                setValArr([
                                    //@ts-ignore
                                    date[0]?.startOf("days").toDate().toUTCString(),
                                    //@ts-ignore
                                    date[1]?.endOf("days").toDate().toUTCString(),
                                ])
                            }
                            format="DD/MM/YYYY"
                        />
                    )}
                </div>
            </Radio.Group>
        </>
    );
    const itemNumberField = (
        <>
            <Radio.Group onChange={changeRadioVal} value={radioValue}>
                <div className="radio-field-number">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.number.isEqualTo}>
                        {t("page._is_equal_to")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.number.isEqualTo && (
                        <Input
                            value={valArr ? valArr[0] : undefined}
                            onChange={(e) => setValArr([e.target.value])}
                            className={
                                isTouched && isErr ? "input-number input-err" : "input-number"
                            }
                            type="number"
                        />
                    )}
                </div>
                <div className="radio-field-number">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.number.isGreaterThan}>
                        {t("page._is_greater_than")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.number.isGreaterThan && (
                        <Input
                            value={valArr ? valArr[0] : undefined}
                            onChange={(e) => setValArr([e.target.value])}
                            type="number"
                            className={
                                isTouched && isErr ? "input-number input-err" : "input-number"
                            }
                        />
                    )}
                </div>
                <div className="radio-field-number">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.number.isLessThan}>
                        {t("page._is_less_than")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.number.isLessThan && (
                        <Input
                            value={valArr ? valArr[0] : undefined}
                            onChange={(e) => setValArr([e.target.value])}
                            className={
                                isTouched && isErr ? "input-number input-err" : "input-number"
                            }
                            type="number"
                        />
                    )}
                </div>
            </Radio.Group>
        </>
    );
    const itemSelectField = (
        <>
            <Radio.Group onChange={changeRadioVal} value={radioValue}>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isEqualToAnyOf}>
                        {t("page._is_equal_to_any_of")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.text.isEqualToAnyOf && (
                        <Select
                            placeholder={t("page.choose_option")}
                            value={(valArr as string[]) || []}
                            onChange={handleSelect}
                            className={
                                isTouched && isErr
                                    ? "select-multi-field input-err"
                                    : "select-multi-field"
                            }
                            mode="multiple"
                            maxTagCount={2}
                        >
                            {selectData?.map((item) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    )}
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.containsAnyOf}>
                        {t("page._contains_any_of")}
                    </Radio>
                    {radioValue === SEGMENT_TYPE.text.containsAnyOf && (
                        <div
                            className={
                                isTouched && isErr ? "input-with-tag input-err" : "input-with-tag"
                            }
                        >
                            {valArr.map((item, index) => {
                                if (typeof item === "string" && item.length > 10)
                                    return (
                                        <Tooltip title={item}>
                                            <div key={index} className="tag">
                                                {`${item.slice(0, 9)}...`}
                                                <CloseCircleFilled
                                                    className="icon-remove"
                                                    onClick={() => removeItem(index)}
                                                />
                                            </div>
                                        </Tooltip>
                                    );
                                else
                                    return (
                                        <div key={index} className="tag">
                                            {item}
                                            <CloseCircleFilled
                                                className="icon-remove"
                                                onClick={() => removeItem(index)}
                                            />
                                        </div>
                                    );
                            })}
                            <Input
                                name="inputVal"
                                onChange={(e) => setInputVal(e.target.value)}
                                value={inputVal}
                                onKeyDown={handleEnter}
                            />
                        </div>
                    )}
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isKnown}>
                        {t("page._is_known")}
                    </Radio>
                </div>
                <div className="radio-field">
                    <Radio style={radioStyle} value={SEGMENT_TYPE.text.isUnknown}>
                        {t("page._is_unknown")}
                    </Radio>
                </div>
            </Radio.Group>
        </>
    );

    const goBackStep = () => {
        backStep(enumSegmentCreateStep.step2);
    };

    const showTypeChoose = () => {
        switch (type) {
            case enumSegmentDataType.text:
                return itemTextField;
            case enumSegmentDataType.date:
                return itemDateField;
            case enumSegmentDataType.number:
                return itemNumberField;
            case enumSegmentDataType.textIncluded:
                return itemSelectField;
            default:
                return <></>;
        }
    };

    return (
        <>
            <div className="form-field">
                <div className="step-3">{showTypeChoose()}</div>
            </div>
            <div className="button-field">
                <SharedButtonDefault
                    text={t("page.back")}
                    type="default"
                    size="default"
                    className="btn-back btn-action"
                    onClick={goBackStep}
                />
                <SharedButtonDefault
                    text={t("page.cancel")}
                    type="default"
                    size="default"
                    className="btn-cancel btn-action"
                    onClick={handleCancel}
                />
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <SharedButtonDefault
                        text={t("page.save")}
                        type="default"
                        size="default"
                        className="btn-save btn-action"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </>
    );
};
