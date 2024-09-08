import { Col, Row } from "reactstrap";
import "./footer.scss";

export default function Footer() {
  const usefullinks = [
    "About",
    "Careers",
    "Blog",
    "Press",
    "Lead",
    "Value",
    "Privacy",
    "Terms",
    "FAQs",
    "Security",
    "Mobile",
    "Contact",
    "Partner",
    "Express",
    "Seller",
    "Spotlight",
    "Warehouse",
    "Deliver",
  ];

  const categorieslin = [
    "vegetables & fruits",
    "dairy, bread & eggs",
    "munchies",
    "bakery & biscuits",
    "breakfast & instant food",
    "tea, coffee & health drinks",
    "cold drinks & juices",
    "sweet tooth",
    "atta, rice & dal",
    "masala, oil & more",
    "sauces & spreads",
    "chicken, meat & fish",
    "organic & healthy living",
    "gourmet & world food",
    "baby care",
    "pharma & wellness",
    "cleaning essentials",
    "home & office",
    "personal care",
    "pet care",
    "Print Store",
  ];

  return (
    <div className="footer-wrap">
      <div className="cust-container">
        <Row>
          <Col md={4}>
            <div className="usefull-links">
              <h3>Useful Links</h3>
              <ul>
                {/* i hace used index here but since data is static it wont be problem id should be used in production */}
                {usefullinks.map((link, index) => {
                  return <li key={index}>{link}</li>;
                })}
              </ul>
            </div>
          </Col>
          <Col md={8}>
            <div className="categories-link">
              <h3>
                Categorie <a href="/">see all</a>
              </h3>
              <ul>
                {categorieslin.map((link, index) => {
                  return <li key={index}>{link}</li>;
                })}
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          <p id="disclaimer">
            “Blinkit” is owned & managed by Blink Commerce Private Limited
            (formerly known as Grofers India Private Limited) and is not
            related, linked or interconnected in whatsoever manner or nature, to
            “GROFFR.COM” which is a real estate services business operated by
            “Redstone Consultancy Services Private Limited”.
          </p>
        </Row>
      </div>
    </div>
  );
}
