import { useParams } from "react-router-dom";
import "./singleproduct.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
} from "../../features/Cart/cartSlice.tsx";

import { AppDispatch, RootState } from "../../app/Store.tsx";

type cartTypeProp = {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export default function SingleProduct() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    img: "",
    description: "",
    price: 0,
  });
  // check if product is in cart
  const [inCart, setInCart] = useState<cartTypeProp | null>(null);

  const dispatch: AppDispatch = useDispatch();

  // const state = useSelector((state) => state.cart);

  // hook to get cart data
  const { cart: cartitems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const foundItem = cartitems.find((item: cartTypeProp) => item.id === id);

    if (foundItem !== undefined) {
      setInCart(foundItem);
    } else {
      setInCart(null);
    }
  }, [cartitems, id]);

  // effect to fetch single product data
  useEffect(() => {
    const fetchSingleProduct = async () => {
      const { data } = await axios(`https://fakestoreapi.com/products/${id}`);

      setProductDetails({
        id: data.id,
        name: data.title,
        img: data.image,
        description: data.description,
        price: data.price,
      });
    };

    fetchSingleProduct();
  }, [id]);

  // function to add item in cart
  const addItemToCart = (event: React.MouseEvent): void => {
    // here we have already have id fetched from parameter
    // we can eiter use id fetched from parameter or we can also store id in  productDetail state
    event.stopPropagation();
    dispatch(
      addItem({
        ...productDetails,
        quantity: 1,
        get total() {
          return this.quantity * this.price;
        },
      })
    );
  };

  // function to increment the product count
  const incrementProductCount = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    qty: number
  ): void => {
    event.stopPropagation();
    dispatch(incrementQuantity({ id, qty }));
  };
  // function to decrement the product count
  const decrementProductCount = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    qty: number
  ): void => {
    event.stopPropagation();
    dispatch(decrementQuantity({ id, qty }));
  };

  return (
    <div className="cust-container">
      <div className="single-product-container">
        <div className="product-info-box">
          <img src={productDetails.img} alt="" />
          <div className="product-details-box">
            <h2>Product Details</h2>

            <div className="info-box">
              <h4>Description</h4>
              <p>{productDetails.description}</p>
            </div>
            <div className="info-box">
              <h4>Key Features</h4>
              <p>
                100% Vegetarian. <br /> Lip smacking flavour. <br /> High
                quality source of milk and proteins. <br /> Contains 10 slices.{" "}
                <br />
              </p>
            </div>
            <div className="info-box">
              <h4>Ingredients</h4>
              <p>Cheese,emulsifying salts,iodized salt,class II preservative</p>
            </div>
            <div className="info-box">
              <h4>Return Policy</h4>
              <p>
                This Item is non-returnable. For a damaged, defective, incorrect
                or expired item, you can request a replacement within 72 hours
                of delivery. In case of an incorrect item, you may raise a
                replacement or return request only if the item is sealed/
                unopened/ unused and in original condition.
              </p>
            </div>
          </div>
        </div>
        <div className="product-price-box">
          <h3>{productDetails.name}</h3>
          <span>8 MINS</span>

          <div className="cart-container">
            <div className="price">₹{productDetails.price}</div>
            <div className="cart-add-button">
              {inCart !== null ? (
                <div className="product-count">
                  <div className="counter">
                    <div
                      className="minus"
                      onClick={(event) =>
                        decrementProductCount(event, inCart.id, inCart.quantity)
                      }
                      aria-hidden="true"
                    >
                      -
                    </div>
                    <div className="count">{inCart.quantity}</div>
                    <div
                      className="plus"
                      onClick={(event) =>
                        incrementProductCount(event, inCart.id, inCart.quantity)
                      }
                      aria-hidden="true"
                    >
                      +
                    </div>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={(event) => addItemToCart(event)}>
                  ADD
                </button>
              )}
            </div>
          </div>

          <div className="why-us">
            <h4>Why shop from blinkit?</h4>
            <div className="reason-to-use">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=45/assets/web/blinkit-promises/10_minute_delivery.png"
                alt=""
              />
              <p>
                <strong>Superfast Delivery</strong> <br /> Get your order
                delivered to your doorstep at the earliest from dark stores near
                you.
              </p>
            </div>
            <div className="reason-to-use">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=45/assets/web/blinkit-promises/Best_Prices_Offers.png"
                alt=""
              />
              <p>
                <strong>Best Prices & Offers</strong> <br /> Best price
                destination with offers directly from the manufacturers.
              </p>
            </div>
            <div className="reason-to-use">
              <img
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=45/assets/web/blinkit-promises/10_minute_delivery.png"
                alt=""
              />
              <p>
                <strong>Superfast Delivery</strong> <br /> Get your order
                delivered to your doorstep at the earliest from dark stores near
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
