import { useState } from "react";

export default function OrderForm({ orderTotal }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidPhone = /^((09|\+2519|2519)\d{8})$/.test(formData.phone.trim());

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.area.trim() !== "" &&
    isValidPhone &&
    orderTotal > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      alert(
        `Order placed successfully for ${formData.name}! Total: ${orderTotal} ETB`,
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 border-t border-gray-200 pt-6 space-y-4 bg-white p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-lg font-bold text-gray-800">
        TeleBirr Delivery Details
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. Abebe Bikila"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          TeleBirr Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full border p-2.5 rounded-md mt-1 text-sm focus:outline-none focus:ring-2 ${
            formData.phone.length > 0 && !isValidPhone
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="0912345678"
        />
        {formData.phone.length > 0 && !isValidPhone && (
          <p className="text-xs text-red-500 mt-1">
            Please enter a valid TeleBirr number starting with 09 or 2519.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Delivery Area
        </label>
        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2.5 rounded-md mt-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="e.g. Bole, Megenagna, Kazanchis"
        />
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-md font-semibold text-sm transition ${
          isFormValid
            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {orderTotal > 0
          ? `Pay ${orderTotal} ETB via TeleBirr`
          : "Add Items to Order"}
      </button>
    </form>
  );
}
