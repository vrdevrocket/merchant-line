import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { SharedInput } from "../shared";
import { FormWrapper } from "../styles";
import { StyledSubmitButton } from "@components";
import { COMPANY_SIZE, LEVEL_EXP } from "@configs";
export const ComponentModuleAccountForm = (props) => {
    const { t } = useTranslation();
    const {
        handleSubmit,
        handleChangeName,
        handleChangeType,
        handleChangePhone,
        handleChangeNumPeople,
        handleChangeLvlExp,
        isSubmitting,
    } = props;
    return (
        <FormWrapper>
            <div className="form-wrap">
                <form onSubmit={handleSubmit}>
                    <div className="page-body">
                        <div className="form-item">
                            <div className="label">{t("page.company_name_question")}</div>
                            <div className="input-field">
                                <SharedInput
                                    placeholder="Rocket digital"
                                    className="new-account-input"
                                    name="name"
                                    onChange={handleChangeName}
                                    styleParent={{ flex: 1 }}
                                />
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.business_type_question")}</div>
                            <div className="input-field">
                                <SharedInput
                                    className="new-account-input"
                                    name="type"
                                    onChange={handleChangeType}
                                    styleParent={{ flex: 1 }}
                                />
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.telephone_number")}</div>
                            <div className="input-field">
                                <SharedInput
                                    className="new-account-input"
                                    name="phone"
                                    onChange={handleChangePhone}
                                    styleParent={{ flex: 1 }}
                                />
                                <div className="desc_link">{t("page.free_setup")}</div>
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.number_of_people")}</div>
                            <div className="input-field select-layout">
                                {COMPANY_SIZE.map((item) => (
                                    <StyledSelectBtn onClick={handleChangeNumPeople} key={item}>
                                        item
                                    </StyledSelectBtn>
                                ))}
                            </div>
                        </div>
                        <div className="form-item">
                            <div className="label">{t("page.level_experience")}</div>
                            <div className="input-field select-layout">
                                {LEVEL_EXP.map((item) => (
                                    <StyledSelectBtn onClick={handleChangeLvlExp} key={item}>
                                        {item}
                                    </StyledSelectBtn>
                                ))}
                            </div>
                        </div>

                        {/* button submit */}
                        <StyledSubmitButton
                            type="default"
                            text={t("page.continue")}
                            htmlType="submit"
                            disable={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </FormWrapper>
    );
};

const StyledSelectBtn = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;

    position: static;
    height: 54px;
    left: 108px;
    top: 0px;
    background: #ffffff;
    border: 1px solid #e1e1e1;
    box-sizing: border-box;
    border-radius: 70px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 8px;
`;
