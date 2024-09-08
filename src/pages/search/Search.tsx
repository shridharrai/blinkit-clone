import CategoriesList from "../../components/CategoriesList.tsx";
import "./search.scss";

export default function Search() {
  return (
    <div className="search-container">
      <div className="cust-container">
        <h5>Treanding</h5>
        <div className="all-categories-list">
          <CategoriesList />
          <CategoriesList />
        </div>
      </div>
    </div>
  );
}
