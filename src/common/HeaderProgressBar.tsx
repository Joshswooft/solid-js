import { Component } from "solid-js";
import { styled } from "solid-styled-components";

interface HeaderProgressBarProps {
  percentage: number;
}

export const HeaderProgressBar = styled("div")`
  width: ${(p: HeaderProgressBarProps) => p.percentage}%;
  position: absolute;
  z-index: 10;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #ffb103;
  border-radius: 5px;
`;
