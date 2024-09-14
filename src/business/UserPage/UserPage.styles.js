import { Paper } from "@mui/material";
import styled from "styled-components";

export const UserPageContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-100"]};
    margin-bottom: 1rem;
  }
`;

export const PeperContainer = styled(Paper).attrs(({ theme }) => ({
  sx: {
    bgcolor: theme["gray-700"],
  },
  elevation: 3,
}))`
  padding: 2rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.8rem;
  margin-bottom: 0.8rem;

  input{
    background-color: ${(props) => props.theme["gray-100"]};
    border-radius: 5px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
