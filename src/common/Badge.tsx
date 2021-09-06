import { styled } from "solid-styled-components";
import { FileStatusProps } from "../FileUploader/types";

const Badge = styled("span")<FileStatusProps>`
  border: 1px solid;
  border-color: ${(p) => p.theme.statusToColor(p.status)};
  border-radius: 2px;
  border-width: 1px;
  color: ${(p) => p.theme.statusToColor(p.status)};
  display: inline-block;
  font-size: 9px;
  letter-spacing: 0.2px;
  line-height: 13px;
  margin: -2px 0px 0px;
  padding: 0px 4px;
  text-align: left;
  text-transform: uppercase;
`;
export default Badge;
