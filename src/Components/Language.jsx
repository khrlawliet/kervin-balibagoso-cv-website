import React from "react";
import confluence from "../assets/TechImages/confluence-logo.png";
import cssLogo from "../assets/TechImages/css3.png";
import docker from "../assets/TechImages/docker-logo.png";
import firebase from "../assets/TechImages/firebase.png";
import git from "../assets/TechImages/git-logo.png";
import github from "../assets/TechImages/github.png";
import gitLab from "../assets/TechImages/gitlab-logo.png";
import graphQL from "../assets/TechImages/graphql-logo.png";
import heroku from "../assets/TechImages/heroku-logo.png";
import htmlLogo from "../assets/TechImages/html5.png";
import jasperReport from "../assets/TechImages/jasperReport.png";
import java from "../assets/TechImages/java.jpeg";
import javafx from "../assets/TechImages/javafx-logo.png";
import javascript from "../assets/TechImages/javascript.png";
import jira from "../assets/TechImages/jira-logo.png";
import maven from "../assets/TechImages/maven-logo.png";
import mysql from "../assets/TechImages/mysql.png";
import reactjs from "../assets/TechImages/reactjs-thumb.jpg";
import selenium from "../assets/TechImages/selenium-java-logo.png";
import spring from "../assets/TechImages/spring-boot-logo.png";
import tortoiseHG from "../assets/TechImages/tortoiseHG.png";
import typeScript from "../assets/TechImages/typescript-logo.png";
import "./Language.css";



export const Language = ({ message }) => {
  return (
    <div className="lang">
      <h1>
        <span>Skills</span>
      </h1>
      <p>{message}</p>
      <div className="img__slider">
        <div className="img__slide">
          <img className="img" src={htmlLogo} alt="" />
          <img className="img" src={cssLogo} alt="" />
          <img className="img" src={javascript} alt="" />
          <img className="img" src={typeScript} alt="" />
          <img className="img" src={reactjs} alt="" />
          <img className="img" src={javafx} alt="" />
          <img className="img" src={java} alt="" />
          <img className="img" src={selenium} alt="" />
          <img className="img" src={spring} alt="" />
          <img className="img" src={graphQL} alt="" />
          <img className="img" src={maven} alt="" />
          <img className="img" src={docker} alt="" />
          <img className="img" src={git} alt="" />
          <img className="img" src={tortoiseHG} alt="" />
          <img className="img" src={github} alt="" />
          <img className="img" src={gitLab} alt="" />
          <img className="img" src={confluence} alt="" />
          <img className="img" src={jira} alt="" />
          <img className="img" src={firebase} alt="" />
          <img className="img" src={heroku} alt="" />
          <img className="img" src={mysql} alt="" />
          <img className="img" src={jasperReport} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Language;
