import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import "./header.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/blinkitlogo.jpg";
import searchbar from "../../assets/icons/searchbar.png";
import cart from "../../assets/icons/cart.png";
import Address from "../../modals/Address.tsx";

import Login from "../../modals/Login.tsx";
import Cart from "../../modals/Cart.tsx";

import { RootState } from "../../app/Store.tsx";

export default function Header() {
  const [deliveryTime] = useState(Math.floor(Math.random() * 10 + 10));
  const [showAdressPopup, setShowAddressPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const customerAddress = useSelector((state: RootState) => state.address);

  const navigate = useNavigate();
  const location = useLocation();

  const { total } = useSelector((state: RootState) => state.cart);
  const cartlen = useSelector((state: RootState) => state.cart);

  // address popup toggle function
  const togglePopupActive = (): void => {
    setShowAddressPopup(!showAdressPopup);
  };

  // function to show and hide login popup
  const showLoginForm = (): void => {
    setShowLoginPopup(true);
  };
  const hideLoginForm = (): void => {
    setShowLoginPopup(false);
  };
  // function to show and hide login popup

  // function to toggle between cart popup state
  const toggleCartPopup = (): void => {
    setShowCartPopup(!showCartPopup);
  };
  // function to toggle between cart popup state

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        hideLoginForm();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <>
      <div className="header-wrap">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {location.pathname === "/search" ? (
            <div className="search-product">
              <input type="text" placeholder="search for atta dal and more" />
              <img src={searchbar} alt="" />
            </div>
          ) : (
            <>
              <div
                className="address-bar"
                onClick={togglePopupActive}
                aria-hidden="true"
              >
                <h3>Delivery in {deliveryTime} minutes</h3>
                <p>
                  {customerAddress.address ||
                    "Click to Detect Your Location"}
                </p>
              </div>
              <div
                className="search-bar"
                onClick={() => navigate("search")}
                aria-hidden="true"
              >
                <img src={searchbar} alt="" />
                <div className="search-animate">
                  <p id="animation-text-1" className="goup">
                    Search "egg"
                  </p>
                  <p id="animation-text-2" className="goup">
                    Search "rice"
                  </p>
                  <p id="animation-text-3" className="goup">
                    Search "sugar"
                  </p>
                  <p id="animation-text-4" className="goup">
                    Search "chips"
                  </p>
                </div>
              </div>
              <div className="log-user">
                <button type="button" onClick={showLoginForm}>
                  Login
                </button>
              </div>
            </>
          )}

          <div className="user-cart">
            <button type="button" onClick={toggleCartPopup}>
              <img src={cart} alt="" />

              {total > 0 ? (
                <span>
                  {cartlen.cart.length} items
                  <br /> ₹{total}
                </span>
              ) : (
                <span> My Cart</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* portal for address */}
      {showAdressPopup &&
        createPortal(
          <Address togglePopupActive={togglePopupActive} />,
          document.body
        )}
      {/* portal for login form */}
      {showLoginPopup &&
        createPortal(<Login hideLoginForm={hideLoginForm} />, document.body)}
      {/* portal for cart sidebar */}
      {showCartPopup &&
        createPortal(
          <Cart closeCartSidebar={toggleCartPopup} />,
          document.body
        )}
    </>
  );
}
