import { Button, Card } from "antd";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { StyledTimeline } from "@components";

interface ITimeLine {
    text: string;
    date: string;
}

interface IProps {
    title: string;
    timeline: ITimeLine[];
}

export const SharedTimeline = ({ title, timeline }: IProps) => (
    <StyledTimeline>
        {title && (
            <div
                className="text-center clearfix mb-4"
                style={{
                    position: "relative",
                    clear: "both",
                }}
            >
                <Button type="primary">{title}</Button>
            </div>
        )}
        {timeline.map((item, index) => (
            <section
                key={index}
                className="clearfix my-4"
                style={{
                    position: "relative",
                    clear: "both",
                }}
            >
                <span className={`icon ${index % 2 ? "icon-odd" : "icon-even"}`} />
                <small className={`date text-muted ${index % 2 ? "date-odd" : "date-even"}`}>
                    {distanceInWordsToNow(item.date)}
                </small>
                <section className={`content ${index % 2 ? "right" : "left"}`}>
                    <Card
                        bordered={false}
                        className={`body shadow-sm ${index % 2 ? "left" : "right"}`}
                    >
                        {item.text}
                    </Card>
                </section>
            </section>
        ))}
    </StyledTimeline>
);
