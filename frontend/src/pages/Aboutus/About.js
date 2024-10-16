import React from "react";

const About = () => {
  return (
    <div className="about-us">
      <header className="about-header">
        <h1>About Us</h1>
      </header>

      <section className="about-content">
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            We strive to deliver the best products and services that bring value
            to our customers. With a focus on innovation, quality, and
            sustainability, we aim to make a lasting impact in the industry
            while building meaningful connections with our clients.
          </p>
        </div>

        <div className="section">
          <h2>Our Vision</h2>
          <p>
            Our vision is to be a global leader in our field, continuously
            growing and evolving to meet the needs of an ever-changing world. We
            are committed to creating opportunities, embracing diversity, and
            fostering a culture of excellence.
          </p>
        </div>

        <div className="section">
          <h2>Our Team</h2>
          <p>
            Our team consists of dedicated professionals who share the same
            passion and commitment to delivering exceptional results. Together,
            we combine expertise, experience, and creativity to achieve our
            common goals.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
