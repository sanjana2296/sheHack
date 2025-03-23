/* import { useState, useEffect } from "react";
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
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch questions from API
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/quiz");
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
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // ✅ Submit quiz answers
  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5001/api/analyze", {
        answers: selectedAnswers,
      });
      setResults(response.data);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError("Failed to analyze results.");
    } finally {
      setSubmitting(false);
    }
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
      
      {}
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

        {}
        {quizQuestions.length > 0 && (
          <MDButton 
            onClick={handleSubmit} 
            variant="contained" 
            color="success" 
            fullWidth 
            sx={{ mt: 3 }} 
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </MDButton>
        )}
      </MDBox>

      <Divider />

      {}
      {results && (
        <MDBox pt={3} pb={3} px={3}>
          <MDTypography variant="h5">Your Personalized Advice</MDTypography>
          <MDTypography variant="body2" mt={2}>{results.recommendations}</MDTypography>
          
          {results.hydrationSuggestion && (
            <>
              <MDTypography variant="h6" mt={3}>Hydration Tip</MDTypography>
              <MDTypography variant="body2">{results.hydrationSuggestion}</MDTypography>
            </>
          )}

          {results.dietSuggestion && (
            <>
              <MDTypography variant="h6" mt={3}>Diet Tip</MDTypography>
              <MDTypography variant="body2">{results.dietSuggestion}</MDTypography>
            </>
          )}

          {results.physicalActivitySuggestion && (
            <>
              <MDTypography variant="h6" mt={3}>Physical Activity Tip</MDTypography>
              <MDTypography variant="body2">{results.physicalActivitySuggestion}</MDTypography>
            </>
          )}

          {results.highStressAdvice && (
            <>
              <MDTypography variant="h6" mt={3} color="error">High Stress Advice</MDTypography>
              <MDTypography variant="body2">{results.highStressAdvice}</MDTypography>
            </>
          )}

          <MDTypography variant="h6" mt={3}>Daily Well-being Tip</MDTypography>
          <MDTypography variant="body2">{results.randomTip}</MDTypography>

          <MDTypography variant="h6" mt={3}>Your Responses & Sentiment Analysis</MDTypography>
          <MDBox component="ul" pl={3}>
            {results.responses.map((r, idx) => (
              <MDTypography key={idx} component="li" variant="body2">
                <strong>{r.question}:</strong> {r.answer} (Sentiment Score: {r.sentimentScore.toFixed(2)})
              </MDTypography>
            ))}
          </MDBox>
        </MDBox>
      )}
    </ConfiguratorRoot>
  );
}

export default Configurator;

*/ 

/*import { useState, useEffect } from "react";
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
  const { openConfigurator } = controller;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch questions from API
  const fetchQuiz = async () => {
    setLoading(true);
    setResults(null);
    setSelectedAnswers({});
    try {
      const response = await axios.get("http://localhost:5001/api/quiz");
      setQuizQuestions(response.data.questions);
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // ✅ Submit quiz answers
  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5001/api/analyze", {
        answers: selectedAnswers,
      });
      setResults(response.data); // ✅ Store results & replace quiz
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError("Failed to analyze results.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
        <MDBox>
          <MDTypography variant="h5">{results ? "Your Results" : "Pregnancy Quiz"}</MDTypography>
          <MDTypography variant="body2" color="text">
            {results ? "Here are your personalized well-being insights." : "Answer these questions to receive suggestions."}
          </MDTypography>
        </MDBox>
        <Icon onClick={handleCloseConfigurator} sx={{ cursor: "pointer" }}>close</Icon>
      </MDBox>
      <Divider />
      
      {}
      <MDBox pt={0.5} pb={3} px={3}>
        {results ? (
          // ✅ Display Results Section
          <>
            <MDTypography variant="h5">Your Personalized Advice</MDTypography>
            <MDTypography variant="body2" mt={2}>{results.recommendations}</MDTypography>

            {results.hydrationSuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>Hydration Tip</MDTypography>
                <MDTypography variant="body2">{results.hydrationSuggestion}</MDTypography>
              </>
            )}

            {results.dietSuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>Diet Tip</MDTypography>
                <MDTypography variant="body2">{results.dietSuggestion}</MDTypography>
              </>
            )}

            {results.physicalActivitySuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>Physical Activity Tip</MDTypography>
                <MDTypography variant="body2">{results.physicalActivitySuggestion}</MDTypography>
              </>
            )}

            {results.highStressAdvice && (
              <>
                <MDTypography variant="h6" mt={3} color="error">High Stress Advice</MDTypography>
                <MDTypography variant="body2">{results.highStressAdvice}</MDTypography>
              </>
            )}

            <MDTypography variant="h6" mt={3}>Daily Well-being Tip</MDTypography>
            <MDTypography variant="body2">{results.randomTip}</MDTypography>

            <MDTypography variant="h6" mt={3}>Your Responses & Sentiment Analysis</MDTypography>
            <MDBox component="ul" pl={3}>
              {results.responses.map((r, idx) => (
                <MDTypography key={idx} component="li" variant="body2">
                  <strong>{r.question}:</strong> {r.answer} (Sentiment Score: {r.sentimentScore.toFixed(2)})
                </MDTypography>
              ))}
            </MDBox>

            {}
            <MDButton onClick={fetchQuiz} variant="contained" color="info" fullWidth sx={{ mt: 3 }}>
              Back to Quiz
            </MDButton>
          </>
        ) : (
          // ✅ Display Quiz Section
          <>
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

            {}
            {quizQuestions.length > 0 && (
              <MDButton 
                onClick={handleSubmit} 
                variant="contained" 
                color="success" 
                fullWidth 
                sx={{ mt: 3 }} 
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </MDButton>
            )}
          </>
        )}
      </MDBox>
      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;
*/


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
  const { openConfigurator } = controller;

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch quiz questions from API
  const fetchQuiz = async () => {
    setLoading(true);
    setResults(null);
    setSelectedAnswers({});
    try {
      const response = await axios.get("http://localhost:5001/api/quiz");
      setQuizQuestions(response.data.questions);
    } catch (err) {
      console.error("Error fetching quiz:", err);
      setError("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  const handleAnswerSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // ✅ Submit quiz answers
  const handleSubmit = async () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5001/api/analyze", {
        answers: selectedAnswers,
      });
      setResults(response.data); // ✅ Store results & replace quiz
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError("Failed to analyze results.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="baseline" pt={4} pb={0.5} px={3}>
        <MDBox>
          <MDTypography variant="h5">{results ? "Your Results" : "Pregnancy Quiz"}</MDTypography>
          <MDTypography variant="body2" color="text">
            {results ? "Here are your personalized well-being insights." : "Answer these questions to receive suggestions."}
          </MDTypography>
        </MDBox>
        <Icon onClick={handleCloseConfigurator} sx={{ cursor: "pointer" }}>close</Icon>
      </MDBox>
      <Divider />
      
      {/* ✅ Show results if available, else display the quiz */}
      <MDBox pt={0.5} pb={3} px={3}>
        {results ? (
          // ✅ Display Results Section
          <>
            <MDTypography variant="h5">Your Personalized Advice</MDTypography>
            <MDTypography variant="body2" mt={2}>{results.recommendations}</MDTypography>

            {results.hydrationSuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>💧 Hydration Tip</MDTypography>
                <MDTypography variant="body2">{results.hydrationSuggestion}</MDTypography>
              </>
            )}

            {results.dietSuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>🥗 Diet Tip</MDTypography>
                <MDTypography variant="body2">{results.dietSuggestion}</MDTypography>
              </>
            )}

            {results.physicalActivitySuggestion && (
              <>
                <MDTypography variant="h6" mt={3}>🏃‍♀️ Physical Activity Tip</MDTypography>
                <MDTypography variant="body2">{results.physicalActivitySuggestion}</MDTypography>
              </>
            )}

            {results.highStressAdvice && (
              <>
                <MDTypography variant="h6" mt={3} color="error">⚠️ High Stress Advice</MDTypography>
                <MDTypography variant="body2">{results.highStressAdvice}</MDTypography>
              </>
            )}

            <MDTypography variant="h6" mt={3}>🌟 Daily Well-being Tip</MDTypography>
            <MDTypography variant="body2">{results.randomTip}</MDTypography>

            {/* ✅ Podcast & Yoga Suggestions */}
            <MDTypography variant="h6" mt={3}>🎧 Recommended Podcasts</MDTypography>
            <MDBox dangerouslySetInnerHTML={{ __html: results.podcastSuggestions }} />

            <MDTypography variant="h6" mt={3}>🧘 Prenatal Yoga Exercises</MDTypography>
            <MDBox dangerouslySetInnerHTML={{ __html: results.yogaSuggestions }} />

            <MDTypography variant="h6" mt={3}>📝 Your Responses & Sentiment Analysis</MDTypography>
            <MDBox component="ul" pl={3}>
              {results.responses.map((r, idx) => (
                <MDTypography key={idx} component="li" variant="body2">
                  <strong>{r.question}:</strong> {r.answer} (Sentiment Score: {r.sentimentScore.toFixed(2)})
                </MDTypography>
              ))}
            </MDBox>

            {/* ✅ Back to Quiz Button */}
            <MDButton onClick={fetchQuiz} variant="contained" color="info" fullWidth sx={{ mt: 3 }}>
              Back to Quiz
            </MDButton>
          </>
        ) : (
          // ✅ Display Quiz Section
          <>
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

            {/* ✅ Submit Button */}
            {quizQuestions.length > 0 && (
              <MDButton 
                onClick={handleSubmit} 
                variant="contained" 
                color="success" 
                fullWidth 
                sx={{ mt: 3 }} 
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </MDButton>
            )}
          </>
        )}
      </MDBox>
      <Divider />
    </ConfiguratorRoot>
  );
}

export default Configurator;


