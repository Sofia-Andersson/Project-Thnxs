import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components'
import LoadingDots from '../lotties/loading.json';

// npm i lottie-react done
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
    <LoadingOuterWrapper>
      <LoadingPageWrapper>
        <Lottie animationData={LoadingDots} options={defaultOptions} height={400} width={400} />
      </LoadingPageWrapper>
    </LoadingOuterWrapper>
  );
}

const LoadingOuterWrapper = styled.div`
position: relative;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

const LoadingPageWrapper = styled.div`
  background: rgba(245, 245, 245, 0.541);
  position: absolute;
  z-index: 1;
  width: 250px;
  min-height: 360px;
  margin-bottom: -50px;
  margin-top: 30px;
  top: 8px;
  padding: 30px;
  border-radius: 24px;

  @media (min-width: 668px){
  margin-top: 10%;
  }
`