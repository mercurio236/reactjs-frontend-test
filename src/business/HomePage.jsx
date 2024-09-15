import React from 'react';
import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import { TableUsers } from '../components/TableUsers/TableUsers';

const HomePage = () => {
  
  const { loading, data } = useSelector((state) => state.home); 

  if (loading) {
    return <div>Carregando usuários</div>;
  }
  return (
    <Container>
      <TableUsers data={data}/>
    </Container>
  );
};

export default HomePage;
