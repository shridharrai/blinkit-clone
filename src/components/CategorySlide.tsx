import "./component.scss";
import Slider from "react-slick";
import SingleProductCard from "./SingleProductCard.tsx";

type sliderinfo = {
  categoryName: string;
  products: {
    id: string;
    image: string;
    title: string;
    price: number;
    quantity: number;
    description: string;
  }[];
};

export default function CategorySlide({ categoryName, products }: sliderinfo) {
  const slidersetting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrow: true,
  };

  return (
    <div className="single-category-product-slide">
      <div className="cust-container">
        <div className="slider-header">
          <h3>{categoryName}</h3>
          <a href="/">See all</a>
        </div>
        <div className="products-slide">
          <Slider {...slidersetting}>
            {products.map((product) => {
              const { id } = product;
              const { title } = product;
              const { quantity } = product;
              const { price } = product;
              const { image } = product;
              return (
                <SingleProductCard
                  key={id}
                  id={id}
                  name={title}
                  quantity={quantity || 5}
                  price={price}
                  image={image}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
