import React from "react";
import { Link } from "react-router-dom";
import hclLogo from "../../logo.png";
import profile_pic from "../../images/profile_pic.png";

// CSS
import "./AppBar.css";

// MUI Components
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { withTheme } from "@mui/styles";
import Typography from "@mui/material/Typography";

// Components
import GlobalSearch from "../SearchBar/GlobalSearch";

function AppBar(props) {
  const { appBar, property } = props;

  return (
    <Grid item xs={12} className={`${appBar}`}>
      <Grid item>
        <Link to="/">
          <img
            src={hclLogo}
            height="100px"
            width="100px"
            className="mainPageLogo"
          />
        </Link>
      </Grid>

      <Grid item xs={6} className="global-search">
        <GlobalSearch data={property.referralData} {...props} />
      </Grid>

      <Grid item xs={3} className="profile">
        <Grid className='profile-wrapper'>
        <Typography className="appbar-name-and-title" variant="h3">
          David Jefferson
        </Typography>
        <Typography className="appbar-name-and-title title" variant="subtitle1">
          Practice Director
          </Typography>
          </Grid>
        <Avatar alt="UU" src={profile_pic} />
      </Grid>
    </Grid>
  );
}

const themedAppBar = withTheme(AppBar);

export default themedAppBar;
