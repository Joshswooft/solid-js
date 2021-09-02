import { Component } from "solid-js"
import { FileProgress } from "./types"
import { For } from 'solid-js';
import { ProgressBarContainer } from '../common';

interface ImportedTableProps {
    files: FileProgress[];
}

export const ImportedTable: Component<ImportedTableProps> = (props: ImportedTableProps) => {

    const columns = [
        {
            id: "name",
            label: "Name",
        },
        {
            id: "startTime",
            label: "Start Time",
        },
        {
            id: "endTime",
            label: "End Time",
        },
        {
            id: "status",
            label: "Status"
        },
    ] 

    return (
        <For each={props.files}>
            {
                (fp: FileProgress) => (
                    <ProgressBarContainer name={fp.file.name} percentage={fp.progress}/>
                )
            }
        </For>
    )
}