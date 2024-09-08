import "./modals.scss";
import { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { addAddress } from "../features/address/addressSlice.tsx";

type showModal = {
  // showAdressPopup: boolean;
  togglePopupActive: () => void;
};

const checkLocationInStorage = (): boolean => {
  const found = localStorage.getItem("address");
  if (found === null) {
    return false;
  }
  return true;
};

export default function Address({
  // showAdressPopup,
  togglePopupActive,
}: showModal) {
  const [allowed, setAllowed] = useState(checkLocationInStorage);
  const [searchResult, setSearchResult] = useState([]);
  const dispatch = useDispatch();

  // function to save address in store
  const saveAddress = (address: string): void => {
    dispatch(addAddress(address));
    setSearchResult([]);
  };

  // TODO:check this thing with never
  const fetchAddress = (): void => {
    // getCurrentPositiontake 2 function first for success and second for failure
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Handle successful geolocation here
        const { latitude, longitude } = position.coords;

        fetch(
          `https://us1.locationiq.com/v1/reverse?key=pk.a5f2bc7bbb224916c3a4c77ef8a7a633&lat=${latitude}&lon=${longitude}&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("address", data.display_name);
            saveAddress(data.display_name);
          });
        setAllowed(true);
      },
      () => {
        setAllowed(false);
      }
    );
  };

  // function to fetch address though searchbar
  const searchAddress = (value: string): void => {
    // TODO: solve issue of empty search
    if (value === "") {
      setSearchResult([]);
    } else {
      fetch(
        `https://api.locationiq.com/v1/autocomplete?key=pk.a5f2bc7bbb224916c3a4c77ef8a7a633&q=${value}&limit=5&dedupe=1`
      )
        .then((response) => response.json())
        .then((data) => {
          const addresslist = data.map(
            (item: { place_id: number; display_name: string }) => {
              return {
                id: item.place_id,
                address: item.display_name,
              };
            }
          );
          setSearchResult(addresslist);
        });
    }
  };

  return (
    <div className="address-container">
      <div className="background-overlay"> </div>
      <div className="address-input-box">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>
            {!allowed
              ? "Please provide your delivery location to see products at nearby store"
              : "Change Location"}
          </h4>
          <button
            type="button"
            style={{ marginRight: "-33px", marginTop: "-37px" }}
            onClick={togglePopupActive}
          >
            X
          </button>
        </div>

        <div className="select-location">
          <button type="button" onClick={fetchAddress}>
            Detect my location
          </button>
          <span>OR</span>
          <input
            type="text"
            name=""
            id=""
            placeholder="Search delivery location"
            onChange={(event) => searchAddress(event.target.value)}
          />
        </div>
        {!allowed && (
          <div className="no-permission">
            <p>
              We do not have permission to determine your location. Please enter
              manually.
            </p>
          </div>
        )}

        <div className="searched-address">
          <ul>
            {searchResult &&
              searchResult.map((result) => {
                const { id } = result;
                const { address } = result;
                return (
                  <li
                    key={id}
                    onClick={() => saveAddress(address)}
                    aria-hidden="true"
                  >
                    {address}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
