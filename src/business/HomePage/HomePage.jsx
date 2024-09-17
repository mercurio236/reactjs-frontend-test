import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button, Container } from "@mui/material";
import { TableUsers } from "../../components/TableUsers/TableUsers";
import { Add } from "@mui/icons-material";
import { HomeContainer } from "./HomePage.styles";
import { DialogAddUser } from "../../components/DialogAddUser/DialogAddUser";

const HomePage = () => {
  const [modalAction, setModalAction] = useState(false);
  const { loading, data } = useSelector((state) => state.home);

  if (loading) {
    return <div>Carregando usuários</div>;
  }
  return (
    <Container>
      <HomeContainer>
        <h1>Usuários</h1>
        <Button
          onClick={() => setModalAction(true)}
          variant="contained"
          color="success"
        >
          <Add />
        </Button>
      </HomeContainer>
      <TableUsers data={data} />
      <DialogAddUser
        handleClose={() => setModalAction(false)}
        open={modalAction}
        title="Criar usuário"
        handleSave={() => {}}
      />
    </Container>
  );
};

export default HomePage;
