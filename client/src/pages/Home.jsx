import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import locIcon from "../assets/gmap.png";
import supportIcon from "../assets/support.png";
import custmrImage from "../assets/custmr.png"; // Assuming custmr.png is in the assets folder
import evtImage from "../assets/evt.png"; // Assuming evt.png is in the assets folder

const Home = () => {
  const navigate = useNavigate();
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get("http://localhost:7000");
        console.log(response.data); // Should output 'Server is running on port 6000'
      } catch (error) {
        console.error("Error connecting to server:", error);
      }
    };

    checkServer();
  }, []);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
<div
  className="d-flex justify-content-center align-items-center text-center position-relative"
  style={{
    backgroundImage: `url(${evtImage})`,
    backgroundSize: "50%", // Reduce the image size to 10%
    backgroundRepeat: "no-repeat", // Prevent the image from repeating
    backgroundPosition: "right -10px bottom -200px", // Move the image to the lower right
    height: "80vh", // Reduced height
    color: "black",
    fontFamily: "Poppins, sans-serif",
    padding: "20px",
  }}
      >
        <div>
          <h1 className="display-4 fw-bold" style={{ color: "#00d33b" }}>
            EVCS and Mart
          </h1>
          <p style={{ fontWeight: "500", fontSize: "1.2rem" }}>
            Your gateway to EV charging, sales, and spare parts.
          </p>
          <div className="mt-3">
            <button
              className="btn btn-success me-3"
              onClick={() => scrollToSection(servicesRef)}
            >
              Explore Services
            </button>
            <button
              className="btn btn-outline-success"
              onClick={() => scrollToSection(aboutRef)}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Location Icon */}
        <div
          className="position-absolute"
          style={{
            top: "20px",
            right: "20px",
            zIndex: 2,
          }}
        >
          <a
            href="https://www.google.com/maps/search/ev+charging+station+near+me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={locIcon}
              alt="Location Icon"
              style={{
                width: "50px",
                height: "50px",
              }}
            />
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} className="container mt-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          {/* Card 1 - EV Charging Stations */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="chrg.jpg"
                className="card-img-top"
                alt="EV Charging Station"
              />
              <div className="card-body">
                <h5 className="card-title">EV Charging Stations</h5>
                <p className="card-text">
                  Fast and reliable EV charging solutions near you, available
                  24/7.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/charging-stations")}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 - EV Sales */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="elr.jpg"
                className="card-img-top"
                alt="EV Sales"
              />
              <div className="card-body">
                <h5 className="card-title">EV Sales</h5>
                <p className="card-text">
                  Discover the latest electric vehicles with great deals and
                  financing options.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Spare Parts */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src="spare.jpg"
                className="card-img-top"
                alt="Spare Parts"
              />
              <div className="card-body">
                <h5 className="card-title">Spare Parts</h5>
                <p className="card-text">
                  Genuine spare parts and accessories for your EV at affordable
                  prices.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/buy")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div ref={aboutRef} className="container my-5">
        <h2 className="text-center mb-4">Why Choose EVCS and Mart?</h2>
        <div className="row justify-content-left">
          <div className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-right">Your One-Stop EV Solution</h5>
                <p className="card-text">
                  EVCS and Mart offers reliable 24/7 EV charging stations, a wide selection of electric vehicles, and genuine spare parts to keep your EV running smoothly. Choose us for innovation, convenience, and a greener tomorrow.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <img src="evmaart.png" alt="EV Mart" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="container py-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src="fast.jpg" className="card-img-top" alt="Fast Charging" />
              <div className="card-body">
                <h5 className="card-title">Fast Charging</h5>
                <p className="card-text">
                  Our stations offer ultra-fast charging for your electric vehicle, ensuring you're back on the road in no time.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src="ggg.jpg" className="card-img-top" alt="Eco-Friendly" />
              <div className="card-body">
                <h5 className="card-title">Eco-Friendly</h5>
                <p className="card-text">
                  We're committed to sustainability and using renewable energy sources for charging your EV.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src="24x7.jpg" className="card-img-top" alt="Customer Service" />
              <div className="card-body">
                <h5 className="card-title">24/7 Customer Support</h5>
                <p className="card-text">
                  Our dedicated team is available around the clock to assist with your needs and queries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div ref={faqRef} className="container py-5">
        <h2 className="text-center mb-4">Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is EVCS and Mart?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="faqOne"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                EVCS and Mart is your one-stop solution for electric vehicle charging stations, EV sales, and spare parts.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faqTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How can I find an EV charging station?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="faqTwo"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                Use our website to find nearby charging stations or simply click on the location icon to view options on Google Maps.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Video Section */}
<div className="container my-5">
  <h2 className="text-center mb-4">
  "Power Up Your Journey with Our EV Charging Solutions"</h2>
  <div className="d-flex justify-content-center">
    <video
      src="EVMart.mp4" // Ensure this file is in the public or accessible folder
      className="shadow"
      style={{
        width: "100%",
        maxWidth: "800px",
        borderRadius: "10px",
      }}
      controls={false}
      autoPlay
      loop
      muted
    ></video>
  </div>
    </div>

      {/* Customer Testimonials Section with Image */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Customer Testimonials</h2>
          <div className="row align-items-center">
            {/* Image Section */}
            <div className="col-md-4">
              <img
                src={custmrImage} // Replaced with custmr.png
                alt="Customer"
                className="img-fluid rounded-circle shadow"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Testimonials Section */}
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <div className="card p-3 shadow-sm">
                    <p>
                      "Excellent services and a very professional team. Highly
                      recommend!"
                    </p>
                    <p className="text-muted">- Alex Johnson</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 shadow-sm">
                    <p>
                      "Wide variety of EVs and spare parts. Great shopping
                      experience!"
                    </p>
                    <p className="text-muted">- Maria Rodriguez</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 shadow-sm">
                    <p>
                      "Quick and reliable charging services. My go-to EV platform."
                    </p>
                    <p className="text-muted">- David Lee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Customer Support */}
      <div
        className="position-fixed"
        style={{
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <a
          href="mailto:support@evcsandmart.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={supportIcon}
            alt="Customer Support"
            className="img-fluid rounded-circle shadow"
            style={{
              width: "70px",
              height: "70px",
            }}
          />
        </a>
      </div>

{/* Footer */}
<footer className="bg-dark text-white text-center py-3">
  <p>
    © 2025 EVCS and Mart. All rights reserved. |{" "}
    <a href="/privacy" style={{ color: "#00d33b" }}>
      Privacy Policy
    </a>
  </p>
</footer>

    </div>
  );
};

export default Home;
