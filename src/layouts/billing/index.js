import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import React from "react";
import { GanttOriginal, ViewMode } from "react-gantt-chart";

import ViewSwitcher from "./components/ViewSwitcher"; 

import { getStartEndDateForProject, initTasks } from "./helpers"; 

function Tables() {
  const [tasks, setTasks] = React.useState(initTasks()); 
  const [view, setView] = React.useState(ViewMode.Month);
  const [isChecked, setIsChecked] = React.useState(true);

  let columnWidth = 60;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Handlers for task updates
  const handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));

    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks.find((t) => t.id === task.project);

      if (project.start.getTime() !== start.getTime() || project.end.getTime() !== end.getTime()) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) => (t.id === task.project ? changedProject : t));
      }
    }

    setTasks(newTasks);
  };

  const handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
  };

  const handleProgressChange = async (task) => {
    console.log("On progress change Id:" + task.id);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDblClick = (task) => {
    console.log("On Double Click event Id:" + task.id);
  };

  const handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task) => {
    console.log("On expander click Id:" + task.id);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          {/* Gantt Chart */}
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                borderRadius="lg"
                                  sx={{
                                    background: "linear-gradient(135deg, #800080, #9c27b0)", // You can adjust this gradient
                                    boxShadow: "0 4px 20px 0 rgba(156, 39, 176, 0.5)", // Custom purple shadow
                                  }}
              >
                <MDTypography variant="h6" color="white">
                  Project Timeline Chart
                </MDTypography>
              </MDBox>

              {/* View Mode Switcher */}
              <MDBox pt={3}>
                <ViewSwitcher
                  onViewModeChange={(viewMode) => setView(viewMode)}
                  onViewListChange={setIsChecked}
                  isChecked={isChecked}
                />
              </MDBox>

              {/* Gantt Chart - Original */}
              <MDBox pt={3}>
                <GanttOriginal
                  tasks={tasks}
                  viewMode={view}
                  onDateChange={handleTaskChange}
                  onDelete={handleTaskDelete}
                  onProgressChange={handleProgressChange}
                  onDoubleClick={handleDblClick}
                  onSelect={handleSelect}
                  onExpanderClick={handleExpanderClick}
                  columnWidth={columnWidth}
                  listCellWidth={isChecked ? "155px" : ""}
                  ganttHeight={300}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Tables;
