import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

import React from "react";
import { GanttOriginal, ViewMode } from "react-gantt-chart";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  // Define the state for tasks in Gantt Chart
  const [tasks] = React.useState([
    {
      type: "project",
      id: "ProjectSample",
      name: "1.Project",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 9, 30),
      progress: 25,
      hideChildren: false,
    },
    {
      type: "task",
      id: "Task 0",
      name: "1.1 Task",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 30),
      progress: 45,
      project: "ProjectSample",
    },
    {
      type: "task",
      id: "Task 1",
      name: "1.2 Task",
      start: new Date(2021, 7, 1),
      end: new Date(2021, 7, 30),
      progress: 25,
      dependencies: ["Task 0"],
      project: "ProjectSample",
    },
    {
      type: "task",
      id: "Task 2",
      name: "1.3 Task",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 7, 30),
      progress: 10,
      dependencies: ["Task 1"],
      project: "ProjectSample",
    },
    {
      type: "milestone",
      id: "Task 6",
      name: "1.3.1 MileStone (KT)",
      start: new Date(2021, 6, 1),
      end: new Date(2021, 6, 30),
      progress: 100,
      dependencies: ["Task 2"],
      project: "ProjectSample",
    },
  ]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
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
                  Artificial Intelligence / Machine Learning Courses
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
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
                   Full Stack Development Courses
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          {/* Gantt Chart
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Project Gantt Chart
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <GanttOriginal
                  tasks={tasks}
                  viewMode={ViewMode.Month}
                  columnWidth={200}
                  ganttHeight={300}
                />
              </MDBox>
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Tables;
