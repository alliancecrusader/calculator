import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import '../App/App.css'
import { angleUnits, defaultAngleUnit } from "../../settings/angleUnits";
import { useState } from "react";

export default function Settings(props = {}) {
  const [angleUnit, setAngleUnit] = useState(props.angleUnit || defaultAngleUnit);

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setAngleUnit(newValue);
      if (props.onAngleUnitChange) {
        props.onAngleUnitChange(newValue);
      }
      console.log("Angle unit changed to:", newValue);
    }
  }

  return (
    <div>
      <h1>Settings</h1>
      <h2>Angle Unit</h2>
        <ToggleButtonGroup
            exclusive
            value = {props.angleUnit}
            color='primary'
            aria-label="angle unit"
            defaultValue="deg"
            sx={{ marginBottom: '20px', color: 'white' }}

            onChange={(event, newValue) => { 
                handleChange(event, newValue);

                if (props.onAngleUnitChange) {
                    props.onAngleUnitChange(newValue);
                }
             }   
            }
        >
            {angleUnits.map((unit) => (
                <ToggleButton key={unit.value} value={unit.value} sx = {{ color: 'white' }}>
                    {unit.label}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    </div>
  );
}