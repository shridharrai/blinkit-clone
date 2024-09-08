import { Col, Row } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import featuredcategory from "../../assets/featuredcategory.webp";
import beauty from "../../assets/beauth.webp";
import electronics from "../../assets/electronics.avif";
import lowestprices from "../../assets/lowestprices.avif";
import pharmacy from "../../assets/pharmacy.avif";
import "./home.scss";
import CategoriesList from "../../components/CategoriesList.tsx";
import CategorySlide from "../../components/CategorySlide.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchproduct = async () => {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      // const { products } = await data;
      setAllProducts(data);
    };

    fetchproduct();
  }, []);

  return (
    <div>
      {/* featured category container starts */}
      <div className="cust-container">
        <Row>
          <Col md="12">
            <div className="featured-category-banner">
              <img src={featuredcategory} alt="" />
            </div>
          </Col>
        </Row>
      </div>

      {/* featured category container starts */}
      {/* offers container starats */}
      <div className="cust-container">
        <Row>
          <div className="new-offers">
            <img src={lowestprices} alt="" />
            <img src={beauty} alt="" />
            <img src={electronics} alt="" />
            <img src={pharmacy} alt="" />
          </div>
        </Row>
      </div>
      {/* offers container ends */}

      {/* all categories link container starts */}
      <div className="cust-container">
        <div className="all-categories-list">
          <CategoriesList />
          <CategoriesList />
        </div>
      </div>
      {/* all categories link container ends */}

      {/* category slider for dairy products start */}
      <CategorySlide
        categoryName="Dairy, Bread & Eggs"
        products={allProducts}
      />
      {/* category slider for dairy products ends */}

      {/* category slider for rolling paper start */}
      <CategorySlide
        categoryName="Rolling paper & tobacco"
        products={allProducts}
      />
      {/* category slider for rolling paper ends */}

      {/* category slider for snacks start */}
      <CategorySlide categoryName="Snacks & Munchies" products={allProducts} />
      {/* category slider for snacks ends */}

      {/* category slider for Cold Drinks & Juices start */}
      <CategorySlide
        categoryName="Cold Drinks & Juices"
        products={allProducts}
      />
      {/* category slider for Cold Drinks & Juices ends */}

      {/* category slider for Candies & Gums start */}
      <CategorySlide categoryName="Candies & Gums" products={allProducts} />
      {/* category slider for Candies & Gums ends */}
    </div>
  );
}
