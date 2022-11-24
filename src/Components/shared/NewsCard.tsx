import { Avatar, Card, List } from "antd";

interface IFeed {
    from: string;
    avatar: Element;
    subject: string;
    message: string;
}

interface IProps {
    feed: IFeed[];
    title: string;
    subtitle?: string;
}

export const SharedNewsCard = ({ feed, title, subtitle }: IProps) => (
    <Card title={title} extra={<small>{subtitle}</small>} className="mb-4">
        <List
            itemLayout="horizontal"
            dataSource={feed}
            renderItem={(item) => (
                <List.Item className="border-bottom-0">
                    <List.Item.Meta
                        avatar={
                            item.avatar ? (
                                item.avatar
                            ) : (
                                <Avatar
                                    size={48}
                                    style={{
                                        color: "rgb(143, 0, 245)",
                                        backgroundColor: "rgb(214, 207, 253)",
                                    }}
                                >
                                    {item.subject.charAt(0)}
                                </Avatar>
                            )
                        }
                        title={
                            <a href="javascript:;" className="text-truncate">
                                {item.subject}
                            </a>
                        }
                        description={<span className="text-truncate">{item.message}</span>}
                    />
                </List.Item>
            )}
        />
    </Card>
);
