import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

const Contact = ({ data }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  }, [isLoading]);

  const handleClick = (e) => {
    setIsLoading(true);
    e.preventDefault();
    let email = {
      name: name,
      subject: subject,
      emailAddress: emailAddress,
      message: message,
    };

    axios
      .post(
        "https://spring-boot-employee-backend.herokuapp.com/api/v1/send",
        email
      )
      .then((res) => {
        setIsLoading(false);
        alert("Message sent! Thank you for sending me a message!");
      });
  };

  return (
    <LoadingOverlay active={isLoading} spinner text="Sending message...">
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{data?.message}</p>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form id="contactForm" name="contactForm">
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactName"
                    name="contactName"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactEmail"
                    name="contactEmail"
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactSubject"
                    name="contactSubject"
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    cols="50"
                    rows="15"
                    id="contactMessage"
                    name="contactMessage"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={handleClick}
                    className="submit"
                  >
                    Submit
                  </button>
                  <span id="image-loader">
                    <img alt="" src="images/loader.gif" />
                  </span>
                </div>
              </fieldset>
            </form>

            <div id="message-warning"> Error boy</div>
            <div id="message-success">
              <i className="fa fa-check"></i>Your message was sent, thank you!
              <br />
            </div>
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {data?.name}
                <br />
                {data?.address.street} <br />
                {data?.address.city}, {data?.address.state} {data?.address.zip}
                <br />
                <span>{data?.phone}</span>
              </p>
            </div>

            <div className="widget widget_tweets"></div>
          </aside>
        </div>
      </section>
    </LoadingOverlay>
  );
};

export default Contact;
