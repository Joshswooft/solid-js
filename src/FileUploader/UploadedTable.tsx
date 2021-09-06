import { Component } from "solid-js";
import { FileProgress } from "./types";
import { For } from "solid-js";
import { UploadedTableItem } from "./UploadedTableItem";
import { styled } from "solid-styled-components";

interface UploadedTableProps {
  files: FileProgress[];
}

export const UploadedTable: Component<UploadedTableProps> = (
  props: UploadedTableProps
) => {
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
      label: "Status",
    },
  ];

  return (
    <div>
      <For each={props.files}>
        {(fp: FileProgress) => <UploadedTableItem {...fp} />}
      </For>
    </div>
  );
};
