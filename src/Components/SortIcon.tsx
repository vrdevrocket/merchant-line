import { memo } from "react";

import {
    IContactListParams,
    IMergeListParams,
    IDefaultListParam,
    ISegmentListParam,
    ITrafficParam,
} from "@interfaces";
import { SharedSortIcon } from "@components";
import {
    enumSortBy,
    enumContactSortFields,
    enumMergeSortFields,
    enumDefaultSortFields,
    enumSegmentSortFields,
    enumTrafficSortFields,
} from "@configs";

interface IContactSortIcon {
    searchParams: IContactListParams;
    sortField: enumContactSortFields;
    sortBy: enumSortBy;
    handleSort: (sortField: enumContactSortFields, sortBy: enumSortBy) => void;
}
interface IMergeSortIcon {
    searchParams: IMergeListParams;
    sortField: enumMergeSortFields;
    sortBy: enumSortBy;
    handleSort: (sortField: enumMergeSortFields, sortBy: enumSortBy) => void;
}
interface IDefaultSortIcon {
    searchParams: IDefaultListParam;
    sortField: enumDefaultSortFields;
    sortBy: enumSortBy;
    handleSort: (sortField: enumDefaultSortFields, sortBy: enumSortBy) => void;
}

interface ISegmentSortIcon {
    searchParams: ISegmentListParam;
    sortField: enumSegmentSortFields;
    sortBy: enumSortBy;
    handleSort: (sortField: enumSegmentSortFields, sortBy: enumSortBy) => void;
}

interface ITrafficSortIcon {
    searchParams: ITrafficParam;
    sortField: enumTrafficSortFields;
    sortBy: enumSortBy;
    handleSort: (sortField: enumTrafficSortFields, sortBy: enumSortBy) => void;
}

export const ComponentContactSortIcon = memo((props: IContactSortIcon) => {
    //props
    const { sortField, sortBy, handleSort, searchParams } = props;
    //variable

    const active = searchParams.sortField === sortField && searchParams.sortBy === sortBy;

    const iconType = sortBy === enumSortBy.ASC ? "caret-up" : "caret-down";

    const handleClick = () => {
        handleSort(sortField, sortBy);
    };

    return <SharedSortIcon type={iconType} active={active} onClick={handleClick} />;
});

export const ComponentMergeSortIcon = memo((props: IMergeSortIcon) => {
    //props
    const { sortField, sortBy, handleSort, searchParams } = props;
    //variable
    const active = searchParams.sortField === sortField && searchParams.sortBy === sortBy;
    const iconType = sortBy === enumSortBy.ASC ? "caret-up" : "caret-down";

    const handleClick = () => {
        handleSort(sortField, sortBy);
    };

    return <SharedSortIcon type={iconType} active={active} onClick={handleClick} />;
});

export const ComponentDefaultSortIcon = memo((props: IDefaultSortIcon) => {
    //props
    const { sortField, sortBy, handleSort, searchParams } = props;
    //variable
    const active = searchParams.sortField === sortField && searchParams.sortBy === sortBy;
    const iconType = sortBy === enumSortBy.ASC ? "caret-up" : "caret-down";

    const handleClick = () => {
        handleSort(sortField, sortBy);
    };

    return <SharedSortIcon type={iconType} active={active} onClick={handleClick} />;
});

export const ComponentSegmentSortIcon = memo((props: ISegmentSortIcon) => {
    //props
    const { sortField, sortBy, handleSort, searchParams } = props;
    //variable
    const active = searchParams.sortField === sortField && searchParams.sortBy === sortBy;
    const iconType = sortBy === enumSortBy.ASC ? "caret-up" : "caret-down";

    const handleClick = () => {
        handleSort(sortField, sortBy);
    };

    return <SharedSortIcon type={iconType} active={active} onClick={handleClick} />;
});

export const ComponentTrafficSortIcon = memo((props: ITrafficSortIcon) => {
    //props
    const { sortField, sortBy, handleSort, searchParams } = props;
    //variable
    const active = searchParams.sortField === sortField && searchParams.sortBy === sortBy;
    const iconType = sortBy === enumSortBy.ASC ? "caret-up" : "caret-down";

    const handleClick = () => {
        handleSort(sortField, sortBy);
    };

    return <SharedSortIcon type={iconType} active={active} onClick={handleClick} />;
});
