import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

export const Modal = ({children , title , open , handleOpenCheckout , actions})=>{
    return(
        <Dialog
          open={open}
          onClose={handleOpenCheckout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogContent id="alert-dialog-description">
             {children}
            </DialogContent>
            {
                actions &&
                <DialogActions>
                   <button onClick={handleClose}>Cancelar</button>
                    <button onClick={handleClose}>Guardar</button>
                </DialogActions>
            }
        </Dialog>
    )
}