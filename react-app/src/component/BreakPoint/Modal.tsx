import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { BreakPointComp } from "../../component/ColorSelector/breakPointModule";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container.MuiDialog-scrollPaper.css-hz1bth-MuiDialog-container":
    {
      height: "80% !important",
    },
}));

declare type dialogProps = {
  open?: any;
  scaleBreakpoints?: any;
  scaleData?: any;
};

export const CustomizedDialogs: React.FC<dialogProps> = ({
  open,
  scaleBreakpoints,
  scaleData,
}: dialogProps) => {
  const [openDialog, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    open(false);
  };

  const [colorScaleBreakpoints, setColorScaleBreakpoints] =
    React.useState<any>(scaleData);

  const editedBreakpoint = React.useCallback(
    (data) => {
      //setColorScaleBreakpoints(data)
      scaleBreakpoints(data);
    },
    [setColorScaleBreakpoints, colorScaleBreakpoints]
  );

  return (
    <div>
      {openDialog && (
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
      )}
    </div>
  );
};
