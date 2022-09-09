import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
//import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { BreakPointComp } from "../../component/ColorSelector/breakPointModule"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container': {
    height: "80% !important",
  },
}));

declare type dialogProps = {
  open?: any,
  scaleBreakpoints?: any
};

export const CustomizedDialogs: React.FC<dialogProps> = ({
  open,
  scaleBreakpoints
}: dialogProps) => {

  const [openDialog, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    open(false)
  };

  

  const [colorScaleBreakpoints, setColorScaleBreakpoints] = React.useState<
      any
    >([
      {
        color: "#ff0000",
        position: 0
      },
      {
        color: "#ffff00",
        position: 0.25
      },
      {
        color: "#00ff00",
        position: 0.5
      },
      {
        color: "#00ffff",
        position: 0.75
      },
      {
        color: "#0000ff",
        position: 1
      }
    ]);

    const editedBreakpoint = React.useCallback((data) => {
      //setColorScaleBreakpoints(data)
      scaleBreakpoints(data)
    },[setColorScaleBreakpoints, colorScaleBreakpoints])

  return (
    <div>
    {
      openDialog && 
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BreakPointComp
        colorScaleBreakpoints={colorScaleBreakpoints}
        setColorScaleBreakpoints={setColorScaleBreakpoints}
        editedBreakpoint={editedBreakpoint}
      />
      </BootstrapDialog>
    }
    </div>
  );
}
