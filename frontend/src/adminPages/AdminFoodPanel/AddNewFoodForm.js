import { ClipLoader } from "react-spinners"; // Loader

const FoodForm = (props) => {
  const {
    form,
    handleChange,
    handleSubmit,
    editingId,
    foodCategories,
    loader,
  } = props;
  return (
    <form className="admin-form" onSubmit={handleSubmit} >
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Food Name*</label>
          <input
            type="text"
            name="foodName"
            placeholder="Food Name"
            value={form.foodName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-group">
          <label>Price*</label>
          <input
            type="number"
            name="foodPrice"
            placeholder="Price"
            value={form.foodPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Image*</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-group">
          <label>Category*</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            {foodCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.menuCategoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Preparation Time*</label>
          <input
            type="number"
            name="preparationTime"
            placeholder="Preparation Time (mins)"
            value={form.preparationTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="admin-form-group">
          <label>Rating*</label>
          <input
            name="rating"
            type="number"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label>Description*</label>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
          ></textarea>
        </div>
        <div className="admin-form-group">
          <label className="availability-label">
            Available?
            <input
              type="checkbox"
              name="isAvailable"
              checked={form.isAvailable}
              onChange={handleChange}
              className="availability-checkbox"
            />
          </label>
        </div>
      </div>

      <button type="submit" className="add-btn">
        {loader ? (
          <ClipLoader size={20} color="#fff" />
        ) : editingId ? (
          "Update Food"
        ) : (
          "Add Food"
        )}
      </button>
    </form>
  );
};

export default FoodForm;
