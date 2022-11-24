import { ISvg } from "@interfaces";

export const IconPen = (props: ISvg) => {
    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.685 3.3581L14.513 1.1861C14.2562 0.929378 13.908 0.785156 13.545 0.785156C13.1819 0.785156 12.8337 0.929378 12.577 1.1861L10.725 3.0391L14.832 7.1461L16.684 5.2941C16.9407 5.03736 17.0849 4.68916 17.0849 4.3261C17.0849 3.96303 16.9407 3.61483 16.684 3.3581H16.685Z"
                fill={props.color || "#646464"}
            />
            <path
                d="M9.75698 4.00781L2.02698 11.7378L0.656982 17.2138L6.13298 15.8448L13.863 8.11481L9.75698 4.00781Z"
                fill={props.color || "#646464"}
            />
        </svg>
    );
};
