import * as S from './DialogDeleteUser.styles'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@mui/material";

export function DialogDeleteUser({ open, handleClose, title, data }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <S.DivTextInfo>
            <p>ID: <span>{data?.id}</span></p>
            <p>Nome: <span>{data?.nome}</span></p>
        </S.DivTextInfo>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Sair</Button>
        <Button variant='contained' color='error'>Deletar</Button>
      </DialogActions>
    </Dialog>
  );
}
