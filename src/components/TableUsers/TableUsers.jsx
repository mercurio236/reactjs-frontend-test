import React from "react";
import * as S from "./TableUsers.styles";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import {
  actions as routeActions,
  types as routes,
} from "../../reducers/routes.actions";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { calculateAge } from "../../utils/calculateAge";
import { DialogDeleteUser } from "../DialogDeleteUser/DialogDeleteUser";
import { actions } from "../../reducers/user.actions";

export function TableUsers({ data }) {
  const state = useSelector((state) => state.user);

  async function handleOpenModalDataUser(dataUser) {
    dispatch(actions.getUser.request(dataUser));
  }

  async function handleDeleteUser(userData) {
    dispatch(actions.deleteUser.request({ id: userData.id }));
  }

  const dispatch = useDispatch();
  return (
    <S.UserListContainer>
      
      <S.UserList>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade/UF</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => {
              return (
                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>
                    {u.cidade}/{u.uf}
                  </td>
                  <td>{calculateAge(u.dataNascimento)}</td>
                  <td>
                    <S.ButtonActions>
                      <Button
                        variant="contained"
                        onClick={() =>
                          dispatch(
                            routeActions.redirectTo(routes.USER, { id: u.id })
                          )
                        }
                      >
                        <Edit />
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenModalDataUser(u)}
                      >
                        <DeleteOutline />
                      </Button>
                    </S.ButtonActions>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </S.UserList>
      <DialogDeleteUser
        open={state.modalShow}
        handleClose={() =>
          dispatch(actions.getUser.request({ modalShow: false }))
        }
        handleDelete={(e) => handleDeleteUser(e)}
        title="Deletar usuário"
        data={state.data}
      />
    </S.UserListContainer>
  );
}
