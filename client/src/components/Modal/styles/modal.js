import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  z-index: 50;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.bg};
  padding: 50px 50px;
  z-index: 21;

  border-radius: 10px;
`;

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background-size: cover;
  margin: 50vh auto 0;
  transform: translateY(-50%);
`;
