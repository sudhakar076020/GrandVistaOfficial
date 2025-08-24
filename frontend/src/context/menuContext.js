import React from "react";

const FoodMenu = React.createContext({
  menuList: [],
  activeCategoryTab: "Main Course",
  handleCategoryTab: () => {},
  
});

export default FoodMenu;
