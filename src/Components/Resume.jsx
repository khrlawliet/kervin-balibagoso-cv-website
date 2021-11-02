import React, { useState, useEffect } from "react";
import Language from "./Language.jsx";
import "./Resume.css";

const Resume = ({ data }) => {
  const [education, setEducation] = useState([]);
  const [works, setWorks] = useState([]);
  const [skillmessage, setSkillMessage] = useState("");

  useEffect(() => {
    if (data) {
      setEducation(data.education);
      setWorks(data.work);
      setSkillMessage(data.skillmessage);
    }
  }, [data]);

  return (
    <div className="resume">
      <section id="resume">
        <div className="row education">
          <h1>
            <span>Education</span>
          </h1>

          {/* <div className="nine columns main-col"> */}
          <div className="row item">
            <div className="twelve columns">
              {education.map((edu) => (
                <div key={edu.school}>
                  <h3>{edu.school}</h3>
                  <p className="info">
                    {edu.degree} <span>&bull;</span>
                    <em className="date">{edu.graduated}</em>
                  </p>
                  <p>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="row work">
          <h1>
            <span>Work Experience</span>
          </h1>

          <div className="row item">
            <div className="twelve columns">
              {works.map((work) => (
                <div key={work.company}>
                  <h3>{work.company}</h3>
                  <p className="info">
                    {work.title}
                    <span>&bull;</span> <em className="date">{work.years}</em>
                  </p>
                  <p>{work.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row skill">
          <div className="resume__skills">
            <Language message={skillmessage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;
