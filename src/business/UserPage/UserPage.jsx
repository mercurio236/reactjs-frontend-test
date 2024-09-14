import React from "react";
import * as S from "./UserPage.styles";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { actions } from "../../reducers/user.actions";
import { ControlledTextField } from "../../components/inputs";
import { Button, Container, Paper } from "@mui/material";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, id } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };

  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  if (loading) {
    return <div>Carregando usuário</div>;
  }

  return (
    <S.UserPageContainer>
      <h2>Usuário #{id}</h2>

      <S.PeperContainer>
        <form onSubmit={formProps.handleSubmit(handleSubmit)}>
          <S.GridContainer>
            <ControlledTextField
              label="Nome"
              name={"nome"}
              formProps={formProps}
              variant="filled"
            />
            <ControlledTextField
              label="CEP"
              name={"cep"}
              formProps={formProps}
              variant="filled"
            />
            <ControlledTextField
              label="Cidade"
              name={"cidade"}
              formProps={formProps}
              variant="filled"
            />
            <ControlledTextField
              label="UF"
              name={"uf"}
              formProps={formProps}
              variant="filled"
            />
          </S.GridContainer>
          <S.ButtonContainer>
            <Button variant="contained" type={"submit"}>GRAVAR</Button>
          </S.ButtonContainer>
        </form>
      </S.PeperContainer>
    </S.UserPageContainer>
  );
};

export default UserPage;
