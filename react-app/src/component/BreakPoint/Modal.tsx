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
    // height: "525px",
    // width: "300px"
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

declare type dialogProps = {
  open?: boolean,
  scaleBreakpoints?: any
};

export const CustomizedDialogs: React.FC<dialogProps> = ({
  open,
  scaleBreakpoints
}: dialogProps) => {

  const [openDialog, setOpen] = React.useState(open);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
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
      setColorScaleBreakpoints(data)
    },[setColorScaleBreakpoints, colorScaleBreakpoints])

    console.log("colorScaleBreakpoints", colorScaleBreakpoints)

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
        {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Colors
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          <BreakPointComp
            colorScaleBreakpoints={colorScaleBreakpoints}
            setColorScaleBreakpoints={setColorScaleBreakpoints}
          />
          </Typography>
        </DialogContent> */}
      </BootstrapDialog>
    }
    </div>
  );
}
