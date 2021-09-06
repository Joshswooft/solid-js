import { Component } from "solid-js";
import { FileProgress } from "./types";
import { For } from "solid-js";
import { UploadedTableItem } from "./UploadedTableItem";
import { styled } from "solid-styled-components";

interface UploadedTableProps {
  files: FileProgress[];
}

const StyledTable = styled("table")`
  box-shadow: 3px 6px 7px 8px rgba(70, 70, 70, 0.03);
  -webkit-box-shadow: 3px 6px 7px 8px rgba(70, 70, 70, 0.03);
  -moz-box-shadow: 3px 6px 7px 8px rgba(70, 70, 70, 0.03);
  width: 100%;
`;

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
    <StyledTable>
      <For each={props.files}>
        {(fp: FileProgress) => <UploadedTableItem {...fp} />}
      </For>
    </StyledTable>
  );
};
