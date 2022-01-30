import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ControlledOpenSelect(props) {
  return (
    <div style={{ width: 220 }}>
      <div className="form-group">
        <label>{props.label}</label>
        <select
          value={props.value}
          onChange={props.onChange}
          className="form-control"
          id="exampleFormControlSelect1"
        >
          <option>{props.label}</option>
          {props.options &&
            props.options.map((opt) => (
              <option key={opt._id} value={opt._id}>
                {opt.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
