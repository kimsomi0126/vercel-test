import { keyframes } from "@emotion/react";

// footer 애니메이션
export const animationGo = keyframes`
0% {
    left: 0;
  }
  to {
    left: 100% ;
  }`;

export const animationFadeIn = keyframes`
from {
   opacity: 0;
  }
  to {
    opacity: 1;
  }`;

export const animationFadeOut = keyframes`
from {
   opacity: 1;
  }
  to {
    opacity: 0;
  }`;

export const animationFadeUp = keyframes`
from {
   transform: translateY(5rem);
   opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }`;

export const animationFadeDown = keyframes`
from {
   transform: translateY(-5rem);
   opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }`;

export const animationFadeLeft = keyframes`
from {
   transform: translateX(-5rem);
   opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }`;

export const animationFadeRight = keyframes`
from {
   transform: translateX(-5rem);
   opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }`;

export const animationSwing = keyframes`

    0% {
        -webkit-transform: rotate(-4deg);
        transform: rotate(-4deg);
    }

    100% {
        -webkit-transform: rotate(2deg);
        transform: rotate(2deg);
    }
`;
