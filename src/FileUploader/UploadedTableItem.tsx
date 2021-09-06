import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { ProgressBar } from "../common";
import { DisplayFileSize } from "./display-file-size";
import { FileProgress, FileStatusProps, Status } from "./types";
import Icon from "../assets/icons/xls-icon.svg";
import Badge from "../common/Badge";

const TableRow = styled("tr")`
  align-items: center;
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 7px 0 0 rgb(70 70 70 / 1%), 0 6px 0 0 rgb(65 65 65 / 1%),
    0 5px 0 0 rgb(60 60 60 / 1%), 0 4px 0 0 rgb(55 55 55 / 1%),
    0 3px 0 0 rgb(50 50 50 / 1%), 0 2px 0 0 rgb(50 50 50 / 1%),
    0 1px 0 0 rgb(45 45 45 / 1%);

  td {
    font-size: 0.85rem;

    &.file-size {
      color: ${(p) => p.theme.colors.gray};
      text-transform: uppercase;
      font-size: 0.8rem;
    }
  }
`;

export const UploadedTableItem: Component<FileProgress> = (
  props: FileProgress
) => {
  return (
    <div>
      <TableRow>
        <td>
          <img src={Icon} />
        </td>
        <td>{props.file.name}</td>
        <td>
          <Badge status={props.status}>{props.status}</Badge>
        </td>
        <td className="file-size">{DisplayFileSize(props.file.size)}</td>
        {/* TODO: clicking on pointer displays more info about the error */}
        <td className="pointer">{props.progress === 100 && "details"}</td>
      </TableRow>
      <ProgressBar percentage={props.progress} status={props.status} />
    </div>
  );
};
