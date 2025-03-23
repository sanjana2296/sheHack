import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import SlackMessages from "layouts/tables/SlackMessages";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Skill Development",
    key: "Skill-development",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Skill-development",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Slack",
    key: "slack",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/slack",
    component: 
    <SlackMessages />,
  },
  {
    type: "collapse",
    name: "Project Timeline",
    key: "project",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/project",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Summary",
    key: "summary",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/summary",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Tech News Feed",
    key: "news-feed",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/news-feed",
    component: <Notifications />,
  },
];

export default routes;
