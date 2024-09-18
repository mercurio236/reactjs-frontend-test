import { ControlledTextField } from "../inputs";
import * as S from "./DialogAddUser.styles";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { actions as searchzipcode } from "../../reducers/searchzipcode.actions";
import { actions as userActions } from "../../reducers/user.actions";

export function DialogAddUser({ open, handleClose, title }) {
  const rules = {};
  const dispatch = useDispatch();
  const { result } = useSelector((state) => state.zipcode);
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };

  function handleGetAddress() {
    const getZipcode = formProps.getValues("cep");
    if (getZipcode) {
      dispatch(searchzipcode.searchZipCode.request(getZipcode));
      formProps.setValue("cidade", result.localidade);
      formProps.setValue("uf", result.uf);
    }
  }

  const handleSubmit = async (values) => {
    await dispatch(userActions.saveUser.request(values));
    handleClose(false);
    formProps.reset({
      nome: "",
      dataNascimento: "",
      cep: "",
      cidade: "",
      uf: "",
    });
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={formProps.handleSubmit(handleSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <S.DivTextInfo>
            <S.GridContainer>
              <ControlledTextField
                label="Nome"
                name={"nome"}
                formProps={formProps}
                variant="filled"
              />
              <ControlledTextField
                label="Data de nascimento"
                name={"dataNascimento"}
                formProps={formProps}
                variant="filled"
                InputLabelProps={{ shrink: true }}
                type="date"
              />

              <ControlledTextField
                label="CEP"
                name={"cep"}
                formProps={formProps}
                variant="filled"
                isZipCode
                onBlur={handleGetAddress}
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
          </S.DivTextInfo>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Sair
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
