import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle
  } from "@material-ui/core";
  import { action } from "@storybook/addon-actions";
  import { withKnobs } from "@storybook/addon-knobs";
  import { storiesOf } from "@storybook/react";
  import React from "react";
  //import { useDialog } from "./useDialog";
  import {CustomizedDialogs} from "./Modal";
  
  storiesOf("modals/Dialog", module)
    .addDecorator(withKnobs)
    .addDecorator(storyFn => (
      <div
        style={{
          textAlign: "center",
          border: "1px solid red",
          borderRadius: 5,
          width: 400
        }}
      >
        {storyFn()}
      </div>
    ))
    .add("default", () => {
        const sonfunction = () => {
            <div>
               <CustomizedDialogs open={true} />
            </div>
          };
   
      return (
        <div style={{ margin: 10 }}>
          <Button
            title=""
            variant="contained"
            color="primary"
            onClick={sonfunction}
          >
            Execute Something
          </Button>
        </div>
      );
    });
  