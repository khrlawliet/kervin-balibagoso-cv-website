import React, { useState, useEffect } from "react";
import './Testimonials.css';

const Testimonials = ({ data }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    if (data) {
      setTestimonials(data.testimonials);
    }
  }, [data]);

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Testimonials</span>
            </h1>
          </div>

          <div className="ten columns flex-container">
            <ul className="slides">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <blockquote>
                    <p>{testimonial.text}</p>
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
