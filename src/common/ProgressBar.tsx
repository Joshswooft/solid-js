import { styled } from "solid-styled-components";
import { Status } from "../FileUploader/types";

interface ProgressBarProps {
    percentage: number;
    status: Status;
}

export const ProgressBar = styled("div")<ProgressBarProps>`
    height: 3px;
    background-color: ${(p) => p.theme.statusToColor(p.status)};
    width: ${(p) => p.percentage}%;
    max-width: 100%;
    transition: width 1s ease-in;
`
