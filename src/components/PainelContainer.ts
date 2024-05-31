import styled from "styled-components";


export const PainelContainer = styled.div`
  height: 100vh;
  
  @media (max-height: 945px) {
    overflow-y: auto;
    /* max-height: 145px; */
    background-size: 100% 100%;
  }
  
`;

export const PainelContainerSemSidebar = styled.div`
  position: relative;

  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10% 32% 58%;

  overflow: hidden;
`;
