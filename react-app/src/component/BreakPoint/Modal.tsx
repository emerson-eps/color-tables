import * as React from "react";
import { ThemeProvider, styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import {
  BreakPointComp,
  IBreakPointArrayItem,
} from "../../component/ColorSelector/BreakPointModule";

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

export type CustomizedDialogsProps = {
  openModal?: any;
  scaleBreakpoints?: any;
  scaleData?: any;
  customScalesName?: string;
};
/**
 * @deprecated use CustomizedDialogsProps instead.
 */
export type dialogProps = CustomizedDialogsProps;

export const CustomizedDialogs: React.FC<CustomizedDialogsProps> = ({
  openModal,
  scaleBreakpoints,
  scaleData,
  customScalesName,
}: CustomizedDialogsProps) => {
  const [openDialog, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    openModal(false);
  };

  const [colorScaleBreakpoints, setColorScaleBreakpoints] =
    React.useState(scaleData);

  const editedBreakpoint = React.useCallback(
    (data: IBreakPointArrayItem[]) => {
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
