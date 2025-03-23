import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Notifications() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=791209644f914fbf8a7351d3013fe789`
        );
        const data = await response.json();
        setNews(data.articles.slice(0, 8)); // Displaying top 8 articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Tech News Alerts</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {news.length > 0 ? (
                  news.map((article, index) => (
                    <MDAlert key={index} color="info" dismissible >
                      <MDTypography variant="body2" color="white">
                        <strong>{article.title}</strong> - {article.description}
                        {article.url && (
                          <MDTypography
                            component="a"
                            href={article.url}
                            variant="body2"
                            fontWeight="medium"
                            color="white"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more
                          </MDTypography>
                        )}
                      </MDTypography>
                    </MDAlert>
                  ))
                ) : (
                  <MDTypography>No news available at the moment.</MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout>
  );
}

export default Notifications;
