import * as React from "react";
import { ColorScale } from "../BreakPoint/ColorScale";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { getColorArrayFromBreakPoints } from "../Utils/legendCommonFunction";
import { CustomizedDialogs } from "../../component/BreakPoint/Modal";

declare type moduleProps = {
  colorScaleBreakpoints?: any;
  editedData?: any;
  isModal?: boolean;
  handleModalClick?: any;
  // setColorScaleBreakpoints?: any;
};

export const LegendComp: React.FC<moduleProps> = ({
  colorScaleBreakpoints,
  editedData,
  isModal,
  handleModalClick,
}: // setColorScaleBreakpoints,
moduleProps) => {
  const [breakpointValues, setBreakPointValues] = React.useState(
    colorScaleBreakpoints
  );

  React.useEffect(() => {
    setBreakPointValues(colorScaleBreakpoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScaleBreakpoints.length]);
  const orderedSelectedColors = React.useMemo(() => {
    return Object.values(breakpointValues).sort(
      (a: any, b: any) => a.position - b.position
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpointValues.length, breakpointValues]);

  const arrayOfColors = React.useMemo(
    () => getColorArrayFromBreakPoints(orderedSelectedColors),
    [orderedSelectedColors]
  );

  const useStyles = makeStyles<Theme>((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
      },
      texture: {
        position: "absolute",
        height: "15px",
        width: "142px",
        marginTop: "15px",
        marginLeft: "23px",
      },
    })
  );

  const [popUpState, setPopUpState] = React.useState(false);

  const openEditModal = React.useCallback(
    (data) => {
      setPopUpState(data.bubbles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popUpState]
  );

  React.useEffect(() => {
    if (isModal) {
      popUpState
        ? document.removeEventListener("mousedown", handleModalClick)
        : document.addEventListener("mousedown", handleModalClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUpState]);

  const classes = useStyles();
  const width = 200;

  const scaleBreakpoints = React.useCallback((value) => {
    if (value) {
      setBreakPointValues(value);
      editedData(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.colorScaleContainer} style={{ width }}>
        <div className={classes.texture} onClick={openEditModal}>
          <ColorScale arrayOfColors={arrayOfColors} />
        </div>
      </div>

      {popUpState === true && (
        <CustomizedDialogs
          openModal={openEditModal}
          scaleBreakpoints={scaleBreakpoints}
          scaleData={orderedSelectedColors}
        />
      )}
    </div>
  );
};
