import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { ProgressBar } from "../common";
import { DisplayFileSize } from "./display-file-size";
import { FileProgress } from "./types";
import Icon from "../assets/icons/xls-icon.svg";
import Badge from "../common/Badge";

const TableRow = styled("tr")`
  align-items: center;
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  background-color: #fff;

  td {
    font-size: 0.85rem;

    &.file-size {
      color: ${(p) => p.theme.colors.gray};
      text-transform: uppercase;
      font-size: 0.8rem;
    }

    &.file-name {
      flex-basis: 180px;
    }

    img {
      background-color: "#fafafa";
      border-bottom: 1px solid #e7e7e7;
      border-radius: 4px;
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
        <td class="file-name">{props.file.name}</td>
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
