interface Iprops {
    color?: string;
}
export const DarkIcon = (props: Iprops) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1322 14.7108C15.4129 14.5487 15.5533 14.4676 15.6585 14.3517C16.0778 13.8893 15.9756 13.1596 15.4453 12.8303C15.3123 12.7478 15.0007 12.6698 14.3775 12.5139C12.3201 11.9992 10.4659 10.6831 9.32178 8.70147C8.17766 6.71978 7.965 4.45592 8.54796 2.41687C8.72447 1.79949 8.81273 1.49079 8.80774 1.33442C8.78781 0.710412 8.20684 0.25687 7.59665 0.388978C7.44374 0.422083 7.30344 0.503081 7.02286 0.665076C3.14424 2.9044 1.81533 7.86397 4.05465 11.7426C6.29397 15.6212 11.2535 16.9501 15.1322 14.7108Z"
            fill={props.color || "white"}
        />
    </svg>
);
