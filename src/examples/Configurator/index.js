import { useState, useEffect } from "react";
import axios from "axios";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenConfigurator } from "context";

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const { openConfigurator, darkMode } = controller;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch questions from API
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/quiz");
        console.log("Quiz Data:", response.data); // Debug log
        setQuizQuestions(response.data.questions);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
        <MDBox>
          <MDTypography variant="h5">Pregnancy Quiz</MDTypography>
          <MDTypography variant="body2" color="text">
            Answer these questions to receive personalized suggestions.
          </MDTypography>
        </MDBox>
        <Icon onClick={handleCloseConfigurator} sx={{ cursor: "pointer" }}>close</Icon>
      </MDBox>
      <Divider />
      
      {/* ✅ Display Quiz Questions */}
      <MDBox pt={0.5} pb={3} px={3}>
        {loading ? (
          <MDTypography>Loading questions...</MDTypography>
        ) : error ? (
          <MDTypography color="error">{error}</MDTypography>
        ) : quizQuestions.length > 0 ? (
          quizQuestions.map((question) => (
            <MDBox key={question.id} mb={2}>
              <MDTypography variant="h6">{question.question}</MDTypography>
              <MDBox display="flex" flexDirection="column" mt={1}>
                {question.options.map((option, index) => (
                  <MDButton 
                    key={index} 
                    onClick={() => handleAnswerSelect(question.id, option)} 
                    variant={selectedAnswers[question.id] === option ? "contained" : "outlined"}
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    {option}
                  </MDButton>
                ))}
              </MDBox>
            </MDBox>
          ))
        ) : (
          <MDTypography>No questions available.</MDTypography>
        )}
      </MDBox>

      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;
