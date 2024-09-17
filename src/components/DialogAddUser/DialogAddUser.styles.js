import styled from "styled-components";

export const DivTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    span {
      font-weight: 700;
    }
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0.8rem;
  margin-bottom: 0.8rem;

  input{
    background-color: ${(props) => props.theme["gray-100"]};
    border-radius: 5px;
  }
`;