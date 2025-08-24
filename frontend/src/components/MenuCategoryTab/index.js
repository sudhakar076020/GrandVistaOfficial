import "./styles.css";

import FoodMenu from "../../context/menuContext";

const MenuCategoryTab = (props) => {
  const { categoryItem, isActiveCategory } = props;
  const { id, menuCategoryName } = categoryItem;

  const activeCategory = isActiveCategory
    ? "active-category"
    : "inActive-category";

  return (
    <FoodMenu.Consumer>
      {(value) => {
        const { handleCategoryTab } = value;

        const onChangeCategoryTab = () => {
          handleCategoryTab(id);
        };
        return (
          <li className="category-tab-item">
            <button
              type="button"
              className={`category-tab-btn ${activeCategory}`}
              onClick={onChangeCategoryTab}
            >
              {menuCategoryName}
            </button>
          </li>
        );
      }}
    </FoodMenu.Consumer>
  );
};

export default MenuCategoryTab;
