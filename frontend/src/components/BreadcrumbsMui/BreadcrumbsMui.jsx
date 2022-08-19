import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {Link} from "react-router-dom"
function BasicBreadcrumbs() {
    return (
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/bloggerDashboard">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
           to= "/bloggerDashboard"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </div>
    );
  }
  