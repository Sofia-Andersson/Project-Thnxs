import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components'
import LoadingDots from '../lotties/loading.json';
import { MainWrapper } from '../styledComponents/MainWrapper';

// Loading component rendered when isLoading=true
export const LoadingPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingDots,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Lottie-animation from json-file showing dots while loading
  return (
    <LoadingPageWrapper>
      <Lottie animationData={LoadingDots} options={defaultOptions} height={400} width={400} />
    </LoadingPageWrapper>
  );
}

// STYLING 
const LoadingPageWrapper = styled(MainWrapper)`
  background: rgba(245, 245, 245, 0.541);
`