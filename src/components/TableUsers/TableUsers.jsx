import React, { useState } from "react";
import * as S from "./TableUsers.styles";
import { DeleteOutline, Edit } from "@mui/icons-material";
import {
  actions as routeActions,
  types as routes,
} from "../../reducers/routes.actions";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { calculateAge } from "../../utils/calculateAge";
import { DialogDeleteUser } from "../DialogDeleteUser/DialogDeleteUser";

export function TableUsers({ data }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});

  async function handleDeleteUser(dataUser) {
    setDeleteUser(dataUser);
    setShowDeleteModal(true);
  }

  const dispatch = useDispatch();
  return (
    <S.UserListContainer>
      <h1>Usuários</h1>
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
                        onClick={() => handleDeleteUser(u)}
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
        open={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        title="Deletar usuário"
        data={deleteUser}
      />
    </S.UserListContainer>
  );
}
