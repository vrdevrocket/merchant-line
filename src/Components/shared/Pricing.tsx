import { Button } from "antd";

import { formatPrice } from "@utils";
import { StyledAmount, StyledFeatures, StyledPricingIcon } from "@components";

interface IFeature {
    title: string;
    available: boolean;
}

interface IProp {
    title: string;
    subtitle: string;
    description: Element;
    icon: Element;
    price: number;
    features: IFeature[];
}

export const SharedPricing = ({ title, subtitle, description, price, features, icon }: IProp) => (
    <div className="bg-white text-center px-3 py-5" style={{ margin: "1px" }}>
        <StyledPricingIcon className="mb-5 text-primary">{icon}</StyledPricingIcon>

        <div className="mb-5">
            <h5 className="mb-0">{title}</h5>
            <small className="mb-0 text-muted">{subtitle}</small>
        </div>

        <StyledFeatures className="mb-5">
            {features.map((feature, index) => (
                <li key={index}>{feature.title}</li>
            ))}
        </StyledFeatures>

        <p className="mb-5">{description}</p>

        <div className="mt-auto">
            <StyledAmount className="text-monospace">
                <span className="symbol">{price === 0 ? "" : "$"}</span>
                <span>{price === 0 ? "free" : formatPrice(price.toString()).replace("$", "")}</span>
            </StyledAmount>

            <Button type="primary">Choose plan</Button>
        </div>
    </div>
);
