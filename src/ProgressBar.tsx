import { Component } from "solid-js";
import { css, styled } from "solid-styled-components";

export const ProgressBar = styled("progress")`
    height: 40px;
    width: 100%;
`

const ProgressBarWrapperClass = css`
    padding: 20px;

    .file-name {
        text-align: left;
        margin-bottom: 0;
        display: block;
    }

    .flex {
        display: flex;
        align-items: center;
    }
    
    .percentage {
        margin-left: 8px;
    }
`

interface ProgressBarContainerProps {
    name: string;
    percentage: number;
}

export const ProgressBarContainer: Component<ProgressBarContainerProps> = (props: ProgressBarContainerProps) => {
    return  (
        <div class={ProgressBarWrapperClass}>
            <label for={props.name} class="file-name">{props.name}</label>
            <div class="flex">
                <ProgressBar id={props.name} max={100} value={props.percentage} />
                <span class="percentage">{props.percentage}%</span>
            </div>
        </div>
    )
}