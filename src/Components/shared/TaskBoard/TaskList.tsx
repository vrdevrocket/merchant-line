import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { SharedTaskItem } from "./TaskItem";

interface IInnerTaskList {
    tasks: any[];
}

class InnerTaskList extends React.Component<IInnerTaskList> {
    shouldComponentUpdate(nextProps: IInnerTaskList) {
        if (nextProps.tasks !== this.props.tasks) {
            return true;
        }
        return false;
    }

    render() {
        return this.props.tasks.map((task, index) => (
            <Draggable
                key={`${index}-${task.title}`}
                draggableId={`${index}-${task.title}`}
                index={index}
            >
                {(dragProvided) => (
                    <SharedTaskItem key={task.id} task={task} provided={dragProvided} />
                )}
            </Draggable>
        ));
    }
}

interface IInnerList {
    tasks: any[];
    dropProvided: any;
}
const InnerList = (props: IInnerList) => {
    const { tasks, dropProvided } = props;

    return (
        <div ref={dropProvided.innerRef}>
            <InnerTaskList tasks={tasks} />
            {dropProvided.placeholder}
        </div>
    );
};

interface IProps {
    tasks: any[];
    ignoreContainerClipping?: boolean | undefined;
    isDropDisabled?: boolean | undefined;
    listId: string;
    title: string;
}

export const SharedTaskList = (props: IProps) => {
    const { ignoreContainerClipping, isDropDisabled, listId, tasks } = props;

    return (
        <Droppable
            droppableId={listId}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
        >
            {(dropProvided) => <InnerList tasks={tasks} dropProvided={dropProvided} />}
        </Droppable>
    );
};
