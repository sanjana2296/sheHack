import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

function ViewSwitcher({ onViewModeChange, onViewListChange, isChecked }) {
  return (
    <div style={styles.container}>
      <FormControlLabel
        control={
          <Switch
            checked={isChecked}
            onChange={(e) => onViewListChange(e.target.checked)}
            name="viewList"
            color="primary"
          />
        }
        label="Show task list"
      />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => onViewModeChange("Month")}>
          Month View
        </button>
        <button style={styles.button} onClick={() => onViewModeChange("Week")}>
          Week View
        </button>
        <button style={styles.button} onClick={() => onViewModeChange("Day")}>
          Day View
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

  },
  buttonContainer: {
    display: "flex",
   marginRight: "400px",
    justifyContent: "center",
    gap: "10px",

     // space between the buttons
  },
  button: {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#1976d2", // MUI primary color
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default ViewSwitcher;
