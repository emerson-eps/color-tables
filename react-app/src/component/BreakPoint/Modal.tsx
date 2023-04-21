import * as React from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { BreakPointComp } from "../../component/ColorSelector/BreakPointModule";
import { useTheme } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    height: "80% !important",
  },
}));

declare type dialogProps = {
  openModal?: any;
  scaleBreakpoints?: any;
  scaleData?: any;
  customScalesName?: string;
};

export const CustomizedDialogs: React.FC<dialogProps> = ({
  openModal,
  scaleBreakpoints,
  scaleData,
  customScalesName,
}: dialogProps) => {
  const [openDialog, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    openModal(false);
  };

  const [colorScaleBreakpoints, setColorScaleBreakpoints] =
    React.useState(scaleData);

  const editedBreakpoint = React.useCallback(
    (data: number[]) => {
      setColorScaleBreakpoints(data);
      scaleBreakpoints(data);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setColorScaleBreakpoints, colorScaleBreakpoints]
  );

  const theme = useTheme();

  return (
    <div>
      {openDialog && (
        <ThemeProvider theme={theme}>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={openDialog}
          >
            <BreakPointComp
              colorScaleBreakpoints={colorScaleBreakpoints}
              setColorScaleBreakpoints={setColorScaleBreakpoints}
              editedBreakpoint={editedBreakpoint}
              customScalesName={customScalesName}
            />
          </BootstrapDialog>
        </ThemeProvider>
      )}
    </div>
  );
};
