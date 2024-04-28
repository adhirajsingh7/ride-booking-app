import logo from "../../assets/images/car-logo.png";
import "./Footer.style.scss";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="footer-category">
        <h1>Company</h1>
        <ul>
          <li>About us</li>
          <li>Our offerings</li>
          <li>Newsroom</li>
          <li>Investors</li>
        </ul>
      </div>
      <div className="footer-popular-product">
        <h1>Products</h1>
        <ul>
          <li>Ride</li>
          <li>Drive</li>
          <li>Deliver</li>
          <li>Eat</li>
        </ul>
      </div>
      <div className="footer-sitemap">
        <h1>Travel</h1>
        <ul>
          <li>Reserve</li>
          <li>Airports</li>
          <li>Cities</li>
          <li>States</li>
        </ul>
      </div>
      <div className="footer-followus">
        <h1>Follow Us</h1>
        <ul>
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
          <li>TikTok</li>
        </ul>
      </div>
    </div>
  );
};
