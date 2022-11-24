import { Draggable } from "react-beautiful-dnd";

import { SharedTaskList } from "./TaskList";
import { StyledTaskBoardInner, StyledWrapper } from "@components";

interface ITask {
    title: string;
    description: string;
    color: "primary" | "success" | "error" | "info" | "normal" | "warning";
    tags: string[];
    images: string[];
}

interface IProps {
    title: string;
    index: number;
    tasks: ITask[];
}

export const SharedColumn = ({ title, tasks, index }: IProps) => (
    <Draggable draggableId={title} index={index}>
        {(provided) => (
            <StyledWrapper key={index}>
                <StyledTaskBoardInner>
                    <h6 className="mx-2 mt-2 text-capitalize">{title}</h6>
                    <div
                        className="p-1 scroll-y"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <SharedTaskList listId={title} title={title} tasks={tasks} />
                    </div>
                </StyledTaskBoardInner>
            </StyledWrapper>
        )}
    </Draggable>
);
