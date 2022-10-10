import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
//import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
//import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
//import LayersIcon from "@mui/icons-material/Layers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Toolbar from "@material-ui/core/Toolbar";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
//import MenuIcon from "@material-ui/icons/Menu";

export const MainListItems = (props) => {
  return (
    <React.Fragment>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/Bloggerdashboard"
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon sx={{ color: "#379683" }} />
          </ListItemIcon>
          <ListItemText />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={props.handleClick}>
        <ListItemIcon>
          <AddCircleIcon sx={{ color: "#379683" }} />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/Bloggerdashboard/notifications"
      >
        <ListItemButton>
          <ListItemIcon>
            <NotificationsActiveIcon sx={{ color: "#379683" }} />
          </ListItemIcon>
          <ListItemText />
        </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon sx={{ color: "#379683" }} />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>
      <Link
        style={{ color: "white", textDecoration: "none" }}
        to="/Bloggerdashboard/calender"
      >
        <ListItemButton>
          <ListItemIcon>
            <CalendarMonthIcon sx={{ color: "#379683" }} />
          </ListItemIcon>
          <ListItemText />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
};

export const SecondaryListItems = () => {
  return (
    <React.Fragment>
      {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader> */}
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon sx={{ color: "#379683" }} />
        </ListItemIcon>
        <ListItemText />
      </ListItemButton>
      {/* <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItemButton> */}
    </React.Fragment>
  );
};

export const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablepadding="true">
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem key={text} disablepadding="true">
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);
