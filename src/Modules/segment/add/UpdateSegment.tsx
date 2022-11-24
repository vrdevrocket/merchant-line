import { useTranslation } from "react-i18next";
import { Drawer } from "antd";
import { useEffect, useState } from "react";

import { enumSegmentCreateStep, enumSegmentDataType, enumSegmentOpts } from "@configs";
import { useWindowDimensions } from "@utils";
import { AddSegmentStepOne, AddSegmentStepTwo, AddSegmentStepThree } from "@modules";
import { ISegmentConditionItem } from "@interfaces";
import { StyledSegmentCondition } from "@components";

interface IProps {
    visible: boolean;
    handleClose: () => void;
    initIncludeOpts: [][];
    initExcludeOpts: [][];
    callBackData: (includeOpts: [][], excludeOpts: [][]) => void;
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
export const ModuleSegmentUpdate = (props: IProps) => {
    //page hook
    const { t } = useTranslation();
    // props
    const { visible, handleClose, initExcludeOpts, initIncludeOpts, callBackData } = props;
    // page state

    const [showStep, setShowStep] = useState<enumSegmentCreateStep>(enumSegmentCreateStep.step1);
    const [includeOpts, setIncludeOpts] = useState<[][]>(initIncludeOpts || [[]]);
    const [excludeOpts, setExcludeOpts] = useState<[][]>(initExcludeOpts || [[]]);
    const [tempData, setTempData] = useState<IItem>(initItem); // item to send step three
    const [objData, setObjData] = useState({ parentIndex: 0, data: undefined, childIndex: -1 }); // item from s3 to s1
    const [indexOpts, setIndexOpts] = useState<{ parent: number; child: number }>({
        parent: 0,
        child: -1,
    });
    const [initValArr, setInitValArr] = useState<any>(null);
    const [isInclude, setIsInclude] = useState(enumSegmentOpts.init); // 0: init arr, 1: includeArr, 2: excludeArr

    const [initOptsData, setInitOptsData] = useState<[]>([]);
    // page variable

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
        // console.log(data);
        setObjData({ parentIndex: indexOpts.parent, data: data, childIndex: indexOpts.child });
        setShowStep(enumSegmentCreateStep.step1);
        setInitValArr(null);
    };
    const handleCancel = () => {
        handleClose();
        setShowStep(enumSegmentCreateStep.step1);
        setIsInclude(enumSegmentOpts.init);
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
    const handleSendSubmit = () => {
        callBackData(includeOpts, excludeOpts);
    };

    useEffect(() => {
        // console.log(objData);
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

    const handleSetName = (e: string) => {
        return e;
    };

    const currentStep = () => {
        switch (showStep) {
            case enumSegmentCreateStep.step1:
                return (
                    <AddSegmentStepOne
                        nameInit={undefined}
                        setName={handleSetName}
                        isSubmitting={false}
                        gotoStep={handleStepOne}
                        includeOpts={includeOpts}
                        excludeOpts={excludeOpts}
                        handleNewItemOpts={handleNewItemOpts}
                        handleSendSubmit={handleSendSubmit}
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
                    ? t("page.update_segment")
                    : t("page.choose_value")
            }
            visible={visible}
            bodyStyle={{ height: "90%", padding: 40 }}
            style={{ maxWidth: "100vw" }}
            width={width <= defaultWidth ? width : defaultWidth}
            closable={true}
            onClose={handleCancel}
        >
            <StyledSegmentCondition>{currentStep()}</StyledSegmentCondition>
        </Drawer>
    );
};
