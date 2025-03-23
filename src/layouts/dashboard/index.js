import Grid from "@mui/material/Grid";
import { useState } from "react";
import { Card, CardContent, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Dashboard() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  };

  return (
    <DashboardLayout>
      <MDBox
        sx={{
          backgroundImage: `url(${require("assets/images/Back.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          px: 2,
        }}
      >
        <DashboardNavbar />

        {/* ✅ Hero Section */}
        <MDBox mt={4} mb={2} textAlign="center">
          <MDTypography
            variant="h1"
            fontWeight="bold"
            sx={{
              fontFamily: "'Dancing Script', cursive",
              color: "purple",
              transition: "all 0.8s ease-in-out",
              ":hover": { letterSpacing: "3px" },
            }}
          >
            SheBalance
          </MDTypography>

          <MDTypography variant="h4" sx={{ fontFamily: "'Poppins', sans-serif", color: "purple" }}>
            Empowering Women through Wellness, Knowledge, and Community.
          </MDTypography>

          <MDTypography
            variant="subtitle2"
            sx={{ fontFamily: "'Poppins', sans-serif", color: "white", mt: 1 }}
          >
            "Self-care is how you take your power back." – Lalah Delia
          </MDTypography>
        </MDBox>

        <MDBox py={3}>
          <Grid container spacing={3}>
            {/* 👋 User Greeting */}
            <Grid item xs={12} md={6} lg={4}>

            </Grid>

            {/* ✅ Habit Tracker */}
            <Grid item xs={12} md={6} lg={4}>
            <Card>
                                    <CardContent>
                                      <MDTypography variant="h5" fontWeight="bold">
                                        Welcome back, Simmi! 💜
                                      </MDTypography>
                                      <MDTypography variant="body2" color="text">
                                        Ready to balance your goals today?
                                      </MDTypography>
                                    </CardContent>
                                  </Card>

            </Grid>

            {/* 🌟 Personalized Recommendations */}
            <Grid item xs={12} md={12} lg={4}>
              <Card>
                <CardContent>
                  <MDTypography variant="h6" fontWeight="bold">
                    Recommended For You
                  </MDTypography>
                  <ul style={{ marginTop: 8 }}>
                    <li>
                      <MDTypography variant="body2">🌿 10-Min Mindfulness Meditation</MDTypography>
                    </li>
                    <li>
                      <MDTypography variant="body2">🍎 Healthy Meal Plan for the Week</MDTypography>
                    </li>
                    <li>
                      <MDTypography variant="body2">📚 Learn: Emotional Intelligence</MDTypography>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </MDBox>



        <MDBox py={3}>
                  <Grid container spacing={3}>
                    {/* 👋 User Greeting */}
                    <Grid item xs={12} md={6} lg={4}>

                    </Grid>

                    {/* ✅ Habit Tracker */}
                    <Grid item xs={12} md={6} lg={4}>

                    </Grid>

                    {/* 🌟 Personalized Recommendations */}
                    <Grid item xs={12} md={12} lg={4}>

                    </Grid>
                  </Grid>
                </MDBox>

      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
