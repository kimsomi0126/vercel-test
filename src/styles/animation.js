import { keyframes } from "@emotion/react";

// 인트로 애니메이션
export const animationRound = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
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
