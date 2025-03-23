import React, { useState } from "react";
 
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
 
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
 
// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
 
function RTL() {
  const [link, setLink] = useState("Choose");
  const [length, setLength] = useState("medium");
  const [language, setLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const summarize = async () => {
    setLoading(true);
    setError("");
    setSummary("");
 
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: link,
          summaryType: length,
          language: language,
        }),
      });
 
      const data = await response.json();
 
      if (response.ok) {
        setSummary(data.data.summary);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={40}>
        <Grid container justifyContent="center">
          <Grid item xs={15} md={30} lg={8}>
            <Card sx={{ p: 10 }}>
              <MDTypography variant="h5" gutterBottom>
                Summarizer
              </MDTypography>
 
              <TextField
                select
                label="Select Channel"
                value={link || ""}
                onChange={(e) => setLink(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    height: 56,
                  },
                }}
              >
                <MenuItem value="">-- Choose --</MenuItem>
                <MenuItem value="https://www.apriqot.co/">SharePoint</MenuItem>
                <MenuItem value="https://www.microsoft.com/en-us/microsoft-teams/group-chat-software">Teams</MenuItem>
                <MenuItem value="https://www.wwt.com/">JIRA</MenuItem>
                <MenuItem value="https://sprints.ai/en-us">Sprint 1</MenuItem>
                <MenuItem value="https://www.scrum.org/resources/what-is-a-sprint-in-scrum">Sprint 2</MenuItem>
              </TextField>
 
              <TextField
                select
                label="Summary Length"
                value={length || ""}
                onChange={(e) => setLength(e.target.value)}
                fullWidth
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    height: 56,
                  },
                }}
              >
                <MenuItem value="short">Short</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="long">Long</MenuItem>
              </TextField>
 
              <TextField
                label="Output Language (ISO Code)"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="en, fr, es, etc."
                fullWidth
                margin="normal"
               
              />
 
              <Button
                variant="contained"
                color="info"
                onClick={summarize}
                fullWidth
                disabled={loading || !link}
                sx={{ mt: 2 }}
              >
                {loading ? "Summarizing..." : "Get Summary"}
              </Button>
 
              {error && (
                <MDTypography color="error" variant="body2" mt={2}>
                  {error}
                </MDTypography>
              )}
 
              {summary && (
                <MDBox mt={4}>
                  <MDTypography variant="h6">Summary</MDTypography>
                  <TextField
                    multiline
                    fullWidth
                    rows={10}
                    value={summary}
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                    margin="normal"
                  />
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default RTL;