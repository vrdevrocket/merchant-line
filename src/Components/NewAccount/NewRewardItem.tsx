import { useSelector } from "react-redux";
import { selectTheme } from "@redux";
import { Avatar } from "antd";

import { IRewardData } from "@interfaces";

import { BLANK_IMAGE_URL } from "@configs";
import styled from "styled-components";
import { IconStarSub } from "@components";
interface IProps {
    data: IRewardData;
}

export const NewRewardItem = (props: IProps) => {
    const { data } = props;
    const Theme = useSelector(selectTheme);
    const mainColor = Theme.mainColor;
    return (
        <StyledLayout>
            <article className="card">
                <div className="image">
                    <Avatar
                        shape="square"
                        src={data?.imageUrl[0] || BLANK_IMAGE_URL}
                        className="avatar"
                    />
                </div>
                <div className="title">
                    <header>
                        <h5>{data.name}</h5>
                        <div className="point">
                            <IconStarSub color={mainColor} />
                            <p>{data.point}</p>
                        </div>
                    </header>
                    {/* @ts-ignore */}
                    {data.description ? (
                        <div dangerouslySetInnerHTML={{ __html: data.description }} />
                    ) : (
                        <p className="placeholder">description</p>
                    )}
                </div>
            </article>
        </StyledLayout>
    );
};
const StyledLayout = styled.div`
    margin-bottom: 16px;
    border: 0.5px solid #e1e1e1;
    padding: 16px;
    border-radius: 12px;
    .card {
        display: flex;
        justify-content: space-between;
        .image {
            flex: 1;
            .avatar {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            flex: 5;
            padding-left: 16px;
            header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 14px;
                margin-top: 8px;
                .point {
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }
                h5 {
                    font-size: 25px;
                    font-weight: bold;
                    margin: 0;
                }
                p {
                    font-size: 25px;
                    font-weight: bold;
                    color: black;
                    margin: 0;
                }
            }
            p {
                font-size: 16px;
                font-weight: 400;
                margin: 0;
                height: 46px;
                overflow: hidden;
            }
            .placeholder {
                visibility: hidden;
            }
        }
    }
`;
