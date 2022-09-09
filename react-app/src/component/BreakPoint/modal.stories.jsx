import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
//import { useDialog } from "./useDialog";
import { CustomizedDialogs } from "./Modal";
import { ColorChangeHandler, ColorResult, SketchPicker } from "react-color";

//   const onChangeComplete = React.useCallback(() => {
//     console.log("######")
//   },
//   []
// );

storiesOf("modals/Dialog", module)
  .addDecorator(withKnobs)
  .addDecorator((storyFn) => (
    <div
      style={{
        textAlign: "center",
        width: 400,
      }}
    >
      {storyFn()}
    </div>
  ))
  .add("default", () => {
    const [popUpState, setPopUpState] = React.useState(false);
    const onClick = React.useCallback(() => {
      setPopUpState(true);
    }, []);
    return (
      <div>
        <button onClick={onClick}>Click me</button>
        {popUpState ? <SketchPicker color={"red"} /> : null}
      </div>
    );
  });
