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
    setColorScaleBreakpoints?: any;
  };

export const LegendComp: React.FC<moduleProps> = ({
    colorScaleBreakpoints,
    setColorScaleBreakpoints,
}: moduleProps) => {

      const orderedSelectedColors = React.useMemo(() => {
        return Object.values(colorScaleBreakpoints).sort(
          (a:any, b:any) => a.position - b.position
        );
      }, [colorScaleBreakpoints]);

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
        const openEditModal = React.useCallback(() => {
            setPopUpState(true);
      }, []);

      const classes = useStyles();
      const width = 200; 

    const scaleBreakpoints = React.useCallback((value) => {
        console.log("vale", value)
    }, []);

    return (
        <div className={classes.root}>
          <div className={classes.colorScaleContainer} style={{ width }}>
            <div className={classes.texture} onClick={openEditModal}>
              <Texture texture={texture} />
            </div>
          </div>
          {
            popUpState ? 
                <CustomizedDialogs open={true} scaleBreakpoints={scaleBreakpoints} /> : null 
            }
        </div>
    )
}