import * as React from "react";
import { Texture } from "../BreakPoint/Texture";
import {
    createStyles,
    makeStyles,
    Theme,
  } from "@material-ui/core";
import { convertBreakpointsToColorArray } from "../Utils/legendCommonFunction";
import {CustomizedDialogs} from "../../component/BreakPoint/Modal";

  declare type moduleProps = {
    colorScaleBreakpoints?: any;
    editedData?: any;
    // setColorScaleBreakpoints?: any;
  };

export const LegendComp: React.FC<moduleProps> = ({
    colorScaleBreakpoints,
    editedData,
    // setColorScaleBreakpoints,
}: moduleProps) => {

    const [breakpointValues, setBreakPointValues] = React.useState(colorScaleBreakpoints);

      const orderedSelectedColors = React.useMemo(() => {
        return Object.values(breakpointValues).sort(
          (a:any, b:any) => a.position - b.position
        );
      }, [breakpointValues]);

      const texture = React.useMemo(
        () => convertBreakpointsToColorArray(orderedSelectedColors),
        [orderedSelectedColors]
      );

      const useStyles = makeStyles<Theme>((theme: Theme) =>
      createStyles({
        root: {
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2)
        },
        texture: {
          position: "absolute",
            height: "15px",
            width: "142px",
            marginTop: "15px",
            marginLeft: "23px"
        },
      })
        );

        const [popUpState, setPopUpState] = React.useState(false);

        const openEditModal = React.useCallback((data) => {
            setPopUpState(data.bubbles);
        }, [popUpState]);

      const classes = useStyles();
      const width = 200; 

    const scaleBreakpoints = React.useCallback((value) => {
      if (value) {
        setBreakPointValues(value)
        editedData(value)
      }
    }, []);

    

    return (
        <div className={classes.root}>
          <div className={classes.colorScaleContainer} style={{ width }}>
            <div className={classes.texture} onClick={openEditModal}>
              <Texture texture={texture} />
            </div>
          </div>
          
          {
            popUpState == true &&
                <CustomizedDialogs open={openEditModal} scaleBreakpoints={scaleBreakpoints} />
            }
        </div>
    )
}