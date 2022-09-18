import * as React from "react";
import { ColorScale } from "../BreakPoint/ColorScale";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { getColorArrayFromBreakPoints } from "../Utils/legendCommonFunction";
import { CustomizedDialogs } from "../../component/BreakPoint/Modal";

declare type moduleProps = {
  colorScaleBreakpoints?: any;
  editedData?: any;
  // setColorScaleBreakpoints?: any;
};

export const LegendComp: React.FC<moduleProps> = ({
  colorScaleBreakpoints,
  editedData,
}: // setColorScaleBreakpoints,
moduleProps) => {
  const [breakpointValues, setBreakPointValues] = React.useState(
    colorScaleBreakpoints
  );

  React.useEffect(() => {
    setBreakPointValues(colorScaleBreakpoints);
  }, [colorScaleBreakpoints.length]);
  const orderedSelectedColors = React.useMemo(() => {
    return Object.values(breakpointValues).sort(
      (a: any, b: any) => a.position - b.position
    );
  }, [breakpointValues.length, breakpointValues]);

  const texture = React.useMemo(
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
    [popUpState]
  );

  const classes = useStyles();
  const width = 200;

  const scaleBreakpoints = React.useCallback((value) => {
    if (value) {
      setBreakPointValues(value);
      editedData(value);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.colorScaleContainer} style={{ width }}>
        <div className={classes.texture} onClick={openEditModal}>
          <ColorScale texture={texture} />
        </div>
      </div>

      {popUpState == true && (
        <CustomizedDialogs
          openModal={openEditModal}
          scaleBreakpoints={scaleBreakpoints}
          scaleData={orderedSelectedColors}
        />
      )}
    </div>
  );
};
