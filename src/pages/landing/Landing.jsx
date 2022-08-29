import React from "react";
import Login from "../auth/Login";
import "./landing.css";
import quorumVideo from './../../assets/bg.mp4';
const Landing = () => {
  return (
    <div className="landingContainer">
      <section className="landingContainer_video">
       <video controls autoPlay loop muted   height="70%">
        <source src={quorumVideo} />
       </video>
      </section>

      <section className="landingContainer_login">
        <Login />
      </section>
    </div>
  );
};

export default Landing;
