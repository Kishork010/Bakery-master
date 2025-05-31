// AddressForm.js
import React, { useState } from "react";
import "./AddressForm.css";
import { useNavigate } from "react-router-dom";

// Label component with optional red star
const Label = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor}>
    {children} {required && <span className="required-star">*</span>}
  </label>
);

function AddressForm() {
  const navigate = useNavigate();
  const totalAmount = parseFloat(localStorage.getItem("cartTotal")) || 0;
  const gst = totalAmount * 0.18;
  const delivery = 50;
  const grandTotal = totalAmount + gst + delivery;

  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    flat: "",
    area: "",
    landmark: "",
    pincode: "",
    city: "",
    taluka: "",
    dist: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    // Only validate required fields
    const requiredFields = [
      "name",
      "mobile",
      "email",
      "pincode",
      "city",
      "state",
    ];
    return requiredFields.every((field) => formData[field]?.trim() !== "");
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      alert("Please fill in all required address details.");
      return;
    }

    const customer = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
    };

    const response = await fetch("https://your-backend.onrender.com/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: grandTotal, customer }),
    });

    const order = await response.json();

    const options = {
      key: "rzp_test_9QPT4JCe3g2LJn",
      amount: order.amount * 100,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch("https://your-backend.onrender.com/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyJson = await verifyRes.json();

        if (verifyJson.success) {
          alert("Payment successful and verified!");

          const orders = JSON.parse(localStorage.getItem("orders")) || [];
          orders.push({
            id: order.id,
            amount: order.amount,
            customer,
            date: new Date().toISOString(),
          });
          localStorage.setItem("orders", JSON.stringify(orders));

          navigate("/success");
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: customer,
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="address-container">
      <form className="address-form">
        <div className="header-row">
          <button
            className="back-button"
            onClick={() => navigate("/cart")}
            type="button"
            aria-label="Back to cart"
          >
            ⬅
          </button>
          <h2>Delivery Address</h2>
        </div>

        {/* Row 1 */}
        <div className="grid-2-cols">
          <div>
            <Label htmlFor="name" required>
              Name
            </Label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="mobile" required>
              Mobile
            </Label>
            <input
              id="mobile"
              name="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid-2-cols">
          <div>
            <Label htmlFor="email" required>
              Email
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="flat">Flat</Label>
            <input
              id="flat"
              name="flat"
              value={formData.flat}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid-2-cols">
          <div>
            <Label htmlFor="area">
              Area
            </Label>
            <input
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="landmark">
              Landmark
            </Label>
            <input
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid-3-cols">
          <div>
            <Label htmlFor="pincode" required>
              Pincode
            </Label>
            <input
              id="pincode"
              name="pincode"
              maxLength={6}
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="city" required>
              City
            </Label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="taluka">Taluka</Label>
            <input
              id="taluka"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 5 */}
        <div className="grid-2-cols">
          <div>
            <Label htmlFor="dist">District</Label>
            <input
              id="dist"
              name="dist"
              value={formData.dist}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="state" required>
              State
            </Label>
            <input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Checkbox to show payment section */}
        <label className="checkbox-container" htmlFor="proceed-payment">
          <input
            id="proceed-payment"
            type="checkbox"
            checked={showPayment}
            onClick={(e) => {
              if (!isFormValid()) {
                e.preventDefault(); // Stop checkbox from changing
                alert("Please fill all required fields before proceeding to payment.");
              }
            }}
            onChange={() => setShowPayment(!showPayment)}
          />


          Proceed to Payment
        </label>
      </form>

      {showPayment && (
        <div className="payment-section">
          <h3>Payment Summary</h3>
          <table className="payment-table">
            <tbody>
              <tr>
                <td>Total:</td>
                <td>₹{totalAmount.toFixed(2)}</td>
              </tr>
              <tr>
                <td>GST (18%):</td>
                <td>₹{gst.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Delivery:</td>
                <td>₹{delivery.toFixed(2)}</td>
              </tr>
              <tr className="total-row">
                <td>
                  <strong>Grand Total:</strong>
                </td>
                <td>
                  <strong>₹{grandTotal.toFixed(2)}</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={handlePayment} className="razorpay-button">
            Pay ₹{grandTotal.toFixed(2)} Securely
          </button>
        </div>
      )}
    </div>
  );
}

export default AddressForm;
