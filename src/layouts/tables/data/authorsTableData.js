import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

export default function data() {
  const Course = ({ icon, name, instructor }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <Icon fontSize="small" color="info">{icon}</Icon>
      <MDBox ml={1.5}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{instructor}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Price = ({ amount }) => (
    <MDBadge badgeContent={`$${amount}`} color="info" variant="gradient" size="sm" />
  );

  const Rating = ({ value }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      ⭐ {value}
    </MDTypography>
  );

  const Register = ({ url }) => (
    <MDTypography
      component="a"
      href={url}
      target="_blank"
      rel="noreferrer"
      variant="caption"
      color="info"
      fontWeight="medium"
    >
      Register
    </MDTypography>
  );

  return {
    columns: [
      { Header: "Name", accessor: "course", width: "45%", align: "left" },
      { Header: "Author", accessor: "instructor", align: "left" },
      { Header: "Price", accessor: "price", align: "center" },
      { Header: "Rating", accessor: "rating", align: "center" },
      { Header: "Register", accessor: "register", align: "center" },
    ],

    rows: [
      {
        course: <Course icon="smart_toy" name="AI For Everyone" instructor="Andrew Ng" />,
        instructor: "DeepLearning.AI",
        price: <Price amount="0" />,
        rating: <Rating value="4.9" />,
        register: <Register url="https://www.coursera.org/learn/ai-for-everyone" />,
      },
      {
        course: <Course icon="memory" name="Machine Learning A-Z" instructor="Kirill Eremenko" />,
        instructor: "Udemy",
        price: <Price amount="12.99" />,
        rating: <Rating value="4.5" />,
        register: <Register url="https://www.udemy.com/course/machinelearning/" />,
      },
      {
        course: <Course icon="device_hub" name="Deep Learning Specialization" instructor="Andrew Ng" />,
        instructor: "DeepLearning.AI",
        price: <Price amount="49" />,
        rating: <Rating value="4.8" />,
        register: <Register url="https://www.coursera.org/specializations/deep-learning" />,
      },
      {
        course: <Course icon="insights" name="Data Science Masterclass" instructor="365 Careers" />,
        instructor: "Udemy",
        price: <Price amount="13.99" />,
        rating: <Rating value="4.6" />,
        register: <Register url="https://www.udemy.com/course/the-data-science-course-complete-data-science-bootcamp/" />,
      },
      {
        course: <Course icon="translate" name="Natural Language Processing" instructor="Younes Bensouda Mourri" />,
        instructor: "DeepLearning.AI",
        price: <Price amount="39" />,
        rating: <Rating value="4.7" />,
        register: <Register url="https://www.coursera.org/learn/natural-language-processing" />,
      },
    ],
  };
}
