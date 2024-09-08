import { useEffect, useState } from "react";
import babycare from "../assets/icons/babycareicon.avif";
import bakery from "../assets/icons/bakeryicon.avif";
import breakfast from "../assets/icons/breakfasticon.avif";
import dairy from "../assets/icons/dairyicon.avif";
import fruit from "../assets/icons/fruitsicon.avif";
import medicine from "../assets/icons/medicinesicon.avif";
import petcare from "../assets/icons/petcareicon.avif";
import snacks from "../assets/icons/snacksicon.avif";
import sweets from "../assets/icons/sweeticon.avif";
import axios from "axios";

const categoryicons = [
  { id: 1, img: babycare },
  { id: 2, img: bakery },
  { id: 3, img: breakfast },
  { id: 4, img: dairy },
  { id: 5, img: fruit },
  { id: 6, img: medicine },
  { id: 7, img: petcare },
  { id: 8, img: snacks },
  { id: 9, img: sweets },
];

export default function CategoriesList() {
  // const [allProducts, setAllProducts] = useState<any>([]);
  // useEffect(() => {
  //   const fetchproduct = async () => {
  //     const { data } = await axios.get("/api/categories");
  //     const { categories } = await data;
  //     setAllProducts(categories);
  //   };

  //   fetchproduct();
  // }, []);
  return (
    <>
      {categoryicons.map((item: any) => {
        return (
          <div className="single-category-icon" key={item.id}>
            <img src={item.img} alt="" />
          </div>
        );
      })}
    </>
  );
}
