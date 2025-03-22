/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function data() {
  const Course = ({ icon, name, instructor }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <Icon fontSize="small" color="info">{icon}</Icon>
      <MDBox ml={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{instructor}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Price = ({ amount }) => (
    <MDTypography variant="caption" color="text" fontWeight="medium">
      ${amount}
    </MDTypography>
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
        course: <Course icon="code" name="The Complete 2024 Web Dev Bootcamp" instructor="Angela Yu" />,
        instructor: "Udemy",
        price: <Price amount="14.99" />,
        rating: <Rating value="4.7" />,
        register: <Register url="https://www.udemy.com/course/the-complete-web-development-bootcamp/" />,
      },
      {
        course: <Course icon="web" name="Full-Stack Web Development with React" instructor="Hong Kong University" />,
        instructor: "Coursera",
        price: <Price amount="0" />,
        rating: <Rating value="4.8" />,
        register: <Register url="https://www.coursera.org/specializations/full-stack-react" />,
      },
      {
        course: <Course icon="build" name="The Odin Project" instructor="Open Source" />,
        instructor: "Free",
        price: <Price amount="0" />,
        rating: <Rating value="4.6" />,
        register: <Register url="https://www.theodinproject.com/" />,
      },
      {
        course: <Course icon="developer_mode" name="Meta Full Stack Developer" instructor="Meta (Facebook)" />,
        instructor: "Coursera",
        price: <Price amount="49" />,
        rating: <Rating value="4.8" />,
        register: <Register url="https://www.coursera.org/professional-certificates/meta-back-end-developer" />,
      },
      {
        course: <Course icon="terminal" name="Java Full Stack Developer" instructor="Simplilearn & IBM" />,
        instructor: "Simplilearn",
        price: <Price amount="59.99" />,
        rating: <Rating value="4.5" />,
        register: <Register url="https://www.simplilearn.com/java-full-stack-developer-certification-course" />,
      },
    ],
  };
}
