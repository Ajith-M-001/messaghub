import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router";
import { grayColor } from "../constants/color";

const VisuallyHiddenInput = styled("input")({
  border: 0,
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "0.9rem",
  backgroundColor: grayColor,
});

const bounceAnimation = keyframes`
 0% {transform: scale(1);}
 50% {transform: scale(1.5);}
 100% {transform: scale(1);}
`;

const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1s infinite ease-in-out`,
}));

export { VisuallyHiddenInput, Link, InputBox, BouncingSkeleton };
