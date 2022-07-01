import React, { Component } from "react";
import Layout from "../../components/Layout";
import Helper from "./Helper";

class Dashboard extends Component {

  handleAuth = async () => {

  const res = await fetch("/isUserAuth" , {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  });

  const data = await res.json();
      if(data.auth == "true")
    this.props.history.push("/dashboard");
    else 
    this.props.history.push("/login");
  };

  

  render() {

    return (
      <>
      <Helper handleAuth={this.handleAuth} />
      <Layout>
        <div className="register">
          <div className="register__title">Login Success</div>
        </div>
      </Layout>
      </>
    );
  }
}

export default Dashboard;
