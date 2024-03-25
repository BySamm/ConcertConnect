import React, {} from "react"; 

import concertImg from '../assets/concert-image.png'
import recommandImg from '../assets/recommand.webp'
import discoverImg from '../assets/crowd-at-concert.webp'
import connectImg from '../assets/meet.webp'
import engageImg from '../assets/live-chats.webp'
import '../assets/vendor/remixicon/remixicon.css'
import '../assets/vendor/boxicons/css/boxicons.css'
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
 
function Header() {
      
    return(
		<>
{/* Hero section or Into */}

<section id="hero" className="d-flex align-items-center">
<div className="container">
  <div className="row row-hero">
    <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
      <h1>Concert Connect</h1>
      <h2>Where Concerts Unites and Memories Resonate</h2>
      <div className="d-flex justify-content-center justify-content-lg-start">
        <a href="#about" className="btn-get-started scrollto">Get Started</a>
       </div>
    </div>
    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
      <img src={concertImg} className="img-fluid animated img" alt="" />
    </div>
  </div>
</div>
</section>
<main id="main">

{/* Features Section */}

<section id="feature" className="feature section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Features</h2>
          <p>Main features to be for this project.</p>
        </div>
        <div className="row">
          <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
            <div className="member d-flex align-items-start">
              <div className="pic"><img src={discoverImg} className="img-fluid" alt="" /></div>
              <div className="member-info">
                <h4>Discover Live Events</h4>
                <span></span>
                <p>Browse through a vast selection of live concerts happening around you. Filter by genre, location, or date to find your next unforgettable live music experience.</p>               
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay="200">
            <div className="member d-flex align-items-start">
              <div className="pic"><img src={connectImg} className="img-fluid" alt="" /></div>
              <div className="member-info">
                <h4>Connect with Artists</h4>
                <span></span>
                <p>Get closer to the artists you love. Follow their profiles for the latest updates, engage with them directly, and become part of their music journey</p>            
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="300">
            <div className="member d-flex align-items-start">
              <div className="pic"><img src={engageImg} className="img-fluid" alt="" /></div>
              <div className="member-info">
                <h4>Real-Time Engagement</h4>
                <span></span>
                <p>Join the conversation with live chats during concerts. Share your moments with the community, rate performances, and create memories that last a lifetime.</p>              
              </div>
            </div>
          </div>
          <div className="col-lg-6 mt-4" data-aos="zoom-in" data-aos-delay="400">
            <div className="member d-flex align-items-start">
              <div className="pic"><img src={recommandImg} className="img-fluid" alt="" /></div>
              <div className="member-info">
                <h4>Recommendations</h4>
                <span></span>
                <p>Discover and stay in the loop with personalized alerts and recommendations, ensuring you are always one step ahead in the live music scene.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  {/* About ConcertCo Section */}

	<section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>About Us</h2>
        </div>
        <div className="row content">
          <div className="col-lg-6">
          <p>
        Inspired by a shared passion for live music and an entrepreneurial spirit, ConcertCo was born out of late-night discussions among friends and music enthusiasts at Holberton School. Recognizing the gap between artists and their fans in the digital age, we set out to create a platform that not only bridges this gap but also cultivates a community around live music experiences. This journey began in 2023, as a portfolio project that quickly evolved into our shared vision for the future of concert engagement.
      </p>
      <p>
        <a href="https://github.com/BySamm/ConcertConnect" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
      </p>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 ab">
        <h3>Meet the Team</h3>
            <span>Sam MBA </span>
            <div className="social">
                  <a href=""><i className="ri-twitter-fill"></i></a>
                  <a href=""><i className="ri-facebook-fill"></i></a>
                  <a href=""><i className="ri-instagram-fill"></i></a>
                  <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                </div>
          </div>
        </div>
      </div>
    </section>
	</main>
  {/*The footer*/}

	<footer id="footer">
    <div className="container footer-bottom clearfix">
      <div className="copyright">
        &copy; Copyright <strong><span>ConcertCo</span></strong>. All Rights Reserved
      </div>
      <div className="credits">
        Designed by <a href="https://bysamm.tech/">Sam Mba</a>
      </div>
    </div>
  </footer>

  <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

		</>	

    )
}
export default Header;
