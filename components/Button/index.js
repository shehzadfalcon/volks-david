import * as React from "react"
import Button from "@mui/material/Button"

export default function IconLabelButtons(props) {
  return (
    <Button
      variant="outlined"
      color="info"
      onClick={props.onClick}
      size="large"
      className="text-capitalize"
      startIcon={props.icon ? props.icon : ""}
    >
      {props.label}
    </Button>
  )
}
