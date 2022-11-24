import { useTranslation } from "react-i18next";
import { Drawer, Spin } from "antd";
import { useEffect, useState } from "react";

import { segmentAPI } from "@api";
import { enumSegmentCreateStep, enumSegmentDataType, enumSegmentOpts, enumStatus } from "@configs";
import { showErrorMessage, useNotify, useWindowDimensions } from "@utils";
import { AddSegmentStepOne, AddSegmentStepTwo, AddSegmentStepThree } from "@modules";
import { ISegmentConditionItem } from "@interfaces";
import { IconLoadingDrawer, StyledSegmentCondition } from "@components";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    callbackGetList: () => void;
}
interface IItem {
    title: string;
    key: string;
    type: enumSegmentDataType;
}
const initItem = {
    title: "",
    key: "",
    type: enumSegmentDataType.init,
};
export const ModuleSegmentAdd = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    const { success, error } = useNotify();
    // page state

    const [showStep, setShowStep] = useState<enumSegmentCreateStep>(enumSegmentCreateStep.step1);
    const [includeOpts, setIncludeOpts] = useState<[][]>([[]]);
    const [excludeOpts, setExcludeOpts] = useState<[][]>([[]]);
    const [tempData, setTempData] = useState<IItem>(initItem); // item to send step three
    const [objData, setObjData] = useState({ parentIndex: 0, data: undefined, childIndex: -1 }); // item from s3 to s1
    const [indexOpts, setIndexOpts] = useState<{ parent: number; child: number }>({
        parent: 0,
        child: -1,
    });
    const [initValArr, setInitValArr] = useState<any>(null);
    const [isInclude, setIsInclude] = useState(enumSegmentOpts.init); // 0: init arr, 1: includeArr, 2: excludeArr
    const [initName, setInitName] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [initOptsData, setInitOptsData] = useState<[]>([]);
    // page variable
    const { visible, handleClose, callbackGetList } = props;
    const defaultWidth = 530;
    const { width } = useWindowDimensions();

    const backToStep = (step: enumSegmentCreateStep) => {
        if (indexOpts.child !== -1) setShowStep(enumSegmentCreateStep.step1);
        else setShowStep(step);
    };
    const handleNewItemOpts = (isInclude: enumSegmentOpts) => {
        if (isInclude === enumSegmentOpts.includeOpts) {
            if (includeOpts[includeOpts.length - 1].length) setIncludeOpts([...includeOpts, []]);
        } else if (isInclude === enumSegmentOpts.excludeOpts) {
            if (excludeOpts[excludeOpts.length - 1].length) setExcludeOpts([...excludeOpts, []]);
        }
    };
    const handleStepOne = (
        index: number,
        isInclude: enumSegmentOpts,
        subIndex: number,
        conditionItem?: ISegmentConditionItem
    ) => {
        if (conditionItem && subIndex !== -1) {
            setShowStep(enumSegmentCreateStep.step3);
            setTempData(conditionItem);
            const obj =
                isInclude === enumSegmentOpts.includeOpts
                    ? includeOpts[index][subIndex]
                    : excludeOpts[index][subIndex];
            // get value of subKeys
            setInitValArr(obj[Object.keys(obj)[0]]);
        } else setShowStep(enumSegmentCreateStep.step2);
        setIsInclude(isInclude);
        setIndexOpts({ parent: index, child: subIndex });
        setInitOptsData(
            isInclude === enumSegmentOpts.includeOpts ? includeOpts[index] : excludeOpts[index]
        );
    };
    const handleStepTwo = (item: IItem) => {
        setTempData(item);
        setShowStep(enumSegmentCreateStep.step3);
        setInitValArr(null);
    };
    const handleStepThree = (data: any) => {
        setObjData({ parentIndex: indexOpts.parent, data: data, childIndex: indexOpts.child });
        setShowStep(enumSegmentCreateStep.step1);
        setInitValArr(null);
    };
    const handleCancel = () => {
        handleClose();
        setShowStep(enumSegmentCreateStep.step1);
        setIncludeOpts([[]]);
        setExcludeOpts([[]]);
        setIsInclude(enumSegmentOpts.init);
        setInitName("");
    };
    const handleDeleteItem = (indexOpts: number, indexItem: number, isInclude: enumSegmentOpts) => {
        if (isInclude === enumSegmentOpts.includeOpts) {
            const x = includeOpts.map((item1, index1) => {
                if (index1 === indexOpts) {
                    return item1.filter((item2, index2) => {
                        if (index2 !== indexItem) return item2;
                    });
                } else return item1;
            }) as [][];
            const y = x.filter((item) => item.length).length
                ? x.filter((item) => item.length)
                : ([[]] as [][]);

            setIncludeOpts(y);
        } else if (isInclude === enumSegmentOpts.excludeOpts) {
            const x = excludeOpts.map((item1, index1) => {
                if (index1 === indexOpts) {
                    return item1.filter((item2, index2) => {
                        if (index2 !== indexItem) return item2;
                    });
                } else return item1;
            }) as [][];
            const y = x.filter((item) => item.length).length
                ? x.filter((item) => item.length)
                : ([[]] as [][]);
            setExcludeOpts(y);
        }
    };
    const handleSendSubmit = async (name: string) => {
        setIsSubmitting(true);
        //why: too much object with different
        const value = {
            name: name,
            includeOpts: [...includeOpts],
            excludeOpts: [...excludeOpts],
            status: enumStatus.INACTIVE,
        };
        try {
            await segmentAPI.create(value);
            success(t("message.create.success"));
        } catch (err: any) {
            if (err.response) {
                error(showErrorMessage(err.response));
            } else error(t("message.create.fail"));
        } finally {
            handleClose();
            callbackGetList();
            setIncludeOpts([[]]);
            setExcludeOpts([[]]);
            setInitName("");
            setIsInclude(enumSegmentOpts.init);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isInclude === enumSegmentOpts.includeOpts) {
            if (objData.childIndex === -1) {
                setIncludeOpts(
                    //@ts-ignore
                    includeOpts.map((item, i) => {
                        if (i === objData.parentIndex) return [...item, objData.data];
                        else return item;
                    })
                );
            } else {
                setIncludeOpts(
                    //@ts-ignore
                    includeOpts.map((item, i) => {
                        if (i === objData.parentIndex)
                            return [
                                ...item.map((item2, i2) => {
                                    if (objData.childIndex === i2) return objData.data;
                                    else return item2;
                                }),
                            ];
                        else return [...item];
                    })
                );
            }
        } else if (isInclude === enumSegmentOpts.excludeOpts)
            if (objData.childIndex === -1) {
                setExcludeOpts(
                    //@ts-ignore
                    excludeOpts.map((item, i) => {
                        if (i === objData.parentIndex) return [...item, objData.data];
                        else return item;
                    })
                );
            } else {
                includeOpts.map((item, i) => {
                    if (i === objData.parentIndex)
                        return [
                            ...item.map((item2, i2) => {
                                if (objData.childIndex === i2) return objData.data;
                                else return item2;
                            }),
                        ];
                    else return [...item];
                });
            }
    }, [objData]);

    const currentStep = () => {
        switch (showStep) {
            case enumSegmentCreateStep.step1:
                return (
                    <AddSegmentStepOne
                        isSubmitting={isSubmitting}
                        gotoStep={handleStepOne}
                        includeOpts={includeOpts}
                        excludeOpts={excludeOpts}
                        handleNewItemOpts={handleNewItemOpts}
                        setName={setInitName}
                        handleSendSubmit={handleSendSubmit}
                        nameInit={initName}
                        handleCancel={handleCancel}
                        handleDelete={handleDeleteItem}
                    />
                );
            case enumSegmentCreateStep.step2:
                return (
                    <AddSegmentStepTwo
                        initData={initOptsData}
                        gotoStep={handleStepTwo}
                        backStep={backToStep}
                        handleCancel={handleCancel}
                        childIndex={indexOpts.child}
                    />
                );
            case enumSegmentCreateStep.step3: {
                return (
                    <AddSegmentStepThree
                        initValArr={initValArr}
                        data={tempData}
                        backStep={backToStep}
                        saveData={handleStepThree}
                        indexArr={indexOpts}
                        handleCancel={handleCancel}
                    />
                );
            }
            default:
                break;
        }
    };

    return (
        <Drawer
            title={
                showStep === enumSegmentCreateStep.step1
                    ? t("page.create_segment")
                    : t("page.choose_value")
            }
            visible={visible}
            bodyStyle={{ height: "90%", padding: 40 }}
            style={{ maxWidth: "100vw" }}
            width={width <= defaultWidth ? width : defaultWidth}
            closable={true}
            onClose={handleCancel}
        >
            <Spin
                style={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                }}
                spinning={isSubmitting}
                indicator={<IconLoadingDrawer />}
            >
                <StyledSegmentCondition>{currentStep()}</StyledSegmentCondition>
            </Spin>
        </Drawer>
    );
};
