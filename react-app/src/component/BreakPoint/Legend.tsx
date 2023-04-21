import * as React from "react";
import { ColorScale } from "../BreakPoint/ColorScale";
import { IconButton, ThemeProvider } from "@mui/material";
import { getColorArrayFromBreakPoints } from "../Utils/legendCommonFunction";
import { CustomizedDialogs } from "../../component/BreakPoint/Modal";
import { Popover } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

declare type moduleProps = {
  colorScaleBreakpoints?: any;
  editedData?: any;
  isModal?: boolean;
  handleModalClick?: any;
  customScalesName?: string;
};

const StyledRootContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  height: 20,
}));

const StyledColorScaleContainer = styled("div")({
  display: "flex",
  marginTop: 8,
  marginLeft: -10,
  height: 27,
  width: 248,

  "&:hover": {
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
  },
});

const StyledTextureContainer = styled("div")({
  height: "13px",
  width: "100px",
  marginTop: "6px",
  marginLeft: "5px",
});

const StyledEditContainer = styled("div")({
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
  height: "50%",
  width: "100%",
  cursor: "pointer",
});

export const LegendComp: React.FC<moduleProps> = ({
  colorScaleBreakpoints,
  editedData,
  isModal,
  handleModalClick,
  customScalesName,
}: moduleProps) => {
  const [breakpointValues, setBreakPointValues] = React.useState(
    colorScaleBreakpoints
  );

  const [customizedBreakpoints, setCustomizedBreakpoints] = React.useState();

  React.useEffect(() => {
    setBreakPointValues(colorScaleBreakpoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScaleBreakpoints.length]);
  const orderedSelectedColors: any = React.useMemo(() => {
    return Object.values(
      breakpointValues.colorArray
        ? breakpointValues.colorArray
        : breakpointValues
    ).sort((a: any, b: any) => a.position - b.position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpointValues.length, breakpointValues]);

  const arrayOfColors = React.useMemo(
    () =>
      orderedSelectedColors.length > 0
        ? getColorArrayFromBreakPoints(orderedSelectedColors)
        : [],
    [orderedSelectedColors]
  );

  const [popUpState, setPopUpState] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    document.removeEventListener("mousedown", handleModalClick);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openEditModal = React.useCallback(
    (data: { bubbles: boolean | ((prevState: boolean) => boolean) }) => {
      setPopUpState(data.bubbles);
      setAnchorEl(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [popUpState]
  );

  const deleteLegend = () => {
    setBreakPointValues([]);
    editedData({ colorArray: colorScaleBreakpoints, customizeFlag: false });
  };

  React.useEffect(() => {
    if (isModal) {
      popUpState
        ? document.removeEventListener("mousedown", handleModalClick)
        : document.addEventListener("mousedown", handleModalClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popUpState]);

  const scaleBreakpoints = React.useCallback(
    (value: (prevState: undefined) => undefined) => {
      if (value) {
        editedData({ colorArray: value, customizeFlag: true });
        setBreakPointValues(value);
        setCustomizedBreakpoints(value);
      }
    },
    [editedData]
  );

  const appendCustomizedBreakPoints = React.useCallback(() => {
    // if breakpoints are editted then use customizedBreakpoints
    editedData({
      colorArray: customizedBreakpoints
        ? customizedBreakpoints
        : breakpointValues,
      customizeFlag: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizedBreakpoints]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const divRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  return (
    arrayOfColors.length > 0 && (
      <ThemeProvider theme={theme}>
        <StyledRootContainer ref={divRef}>
          <StyledColorScaleContainer onClick={appendCustomizedBreakPoints}>
            <StyledTextureContainer>
              <ColorScale arrayOfColors={arrayOfColors} />
            </StyledTextureContainer>
            <div
              style={{
                whiteSpace: "nowrap",
                fontSize: "small",
                fontWeight: "700",
                margin: "6px 0px 0px 6px",
                cursor: "pointer",
              }}
            >
              {customScalesName + " Copy"}
            </div>
          </StyledColorScaleContainer>
          <div className="breadCrumbs">
            <IconButton
              size="small"
              style={{ marginTop: "8px" }}
              onClick={handleClick}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div style={{ height: "60px", width: "80px" }}>
              <StyledEditContainer onClick={openEditModal}>
                <EditIcon
                  style={{ margin: "5px 3px -5px 5px", cursor: "pointer" }}
                  fontSize="small"
                />{" "}
                Edit
              </StyledEditContainer>
              <StyledEditContainer onClick={deleteLegend}>
                <DeleteOutlinedIcon
                  style={{ margin: "5px 3px -5px 5px", cursor: "pointer" }}
                  fontSize="small"
                />{" "}
                Delete
              </StyledEditContainer>
            </div>
          </Popover>

          {popUpState === true && (
            <CustomizedDialogs
              openModal={openEditModal}
              scaleBreakpoints={scaleBreakpoints}
              scaleData={orderedSelectedColors}
              customScalesName={customScalesName}
            />
          )}
        </StyledRootContainer>
      </ThemeProvider>
    )
  );
};
