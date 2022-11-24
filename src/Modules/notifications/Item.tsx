import InfiniteScroll from "react-infinite-scroll-component";
import { Empty, Skeleton } from "antd";

import { ComponentNotificationItem } from "@components";
import { INotifications } from "@interfaces";

interface IProps {
    data: INotifications[];
    page: number;
    nextPage: boolean;
    typeNoti: "ALL" | "REWARDS";
    handleGetInfinity: (page: number) => void;
}

export const ModuleNotificationItem = (props: IProps) => {
    //props
    const { data, page, nextPage, typeNoti, handleGetInfinity } = props;

    return (
        <>
            {data.length ? (
                <InfiniteScroll
                    dataLength={data.length}
                    next={() => handleGetInfinity(page + 1)}
                    hasMore={nextPage}
                    style={{ padding: "0px 4px" }}
                    loader={
                        <Skeleton
                            title={false}
                            className="skeleton-infinity"
                            active
                            paragraph={{ rows: 2 }}
                        />
                    }
                    scrollableTarget={typeNoti === "ALL" ? "scrollableDiv1" : "scrollableDiv2"}
                >
                    {data?.map((item) => (
                        <ComponentNotificationItem
                            key={item._id}
                            title={item.title}
                            body={item.body}
                            notiStatus={item.notiStatus}
                            type={item.type}
                            ticketCode={item.ticketCode}
                            status={item.status}
                            _id={item._id}
                            updatedAt={item.updatedAt}
                            client_user={item.client_user}
                        />
                    ))}
                </InfiniteScroll>
            ) : (
                <Empty />
            )}
        </>
    );
};
