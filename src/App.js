import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import Routes from "./routes";

import * as authActions from "./store/actions/auth";

const App = ({ onAuthCheck }) => {

  useEffect(() => {
    onAuthCheck();
  }, [onAuthCheck]);

  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheck: () => dispatch(authActions.authCheckState()),
  }
}

export default connect(null, mapDispatchToProps)(App);
