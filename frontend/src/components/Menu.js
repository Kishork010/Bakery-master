import React, { useState } from 'react';
import './Menu.css';

// Dynamically import all images from the assets/images directory
const images = require.context('../assets/images', false, /\.(png|jpe?g|svg)$/);

function Menu({ addToCart }) {
 const [popup, setPopup] = useState(null);

  const items = [
    {
      category: 'Bakery Items',
      items: [
        { name: 'Milk Bread', price: '₹35', image: 'milk bread.jpg' },
        { name: 'Wheat Bread', price: '₹35', image: 'wheat bread.jpg' },
        { name: 'Sandwich Bread', price: '₹80', image: 'Sandwitch Bread.jpg' },
        { name: 'Sweet Bread', price: '₹35', image: 'sweet bread.jpg' },
        { name: 'Twisted Khari (250g) ', price: '₹50', image: 'Twistedf khari.jpg' },
        { name: 'Long Khari (250g)', price: '₹50', image: 'long khari.jpg' },
        { name: 'Plain Toast (250g)', price: '₹50', image: 'Plain Toast.jpg' },
        { name: 'Chatini Toast (250g)', price: '₹100', image: 'Chatini Toast.jpg' },
        { name: 'Tutti Frutti Cookies (250g)', price: '₹100', image: 'Tutti Frutti Cookies.jpg' },
        { name: 'Chocolate Cookies (250g)', price: '₹100', image: 'Chocolate Cookies.jpg' },
        { name: 'Coconut Cookies (250g)', price: '₹100', image: 'Coconut Cookies.jpg' },
        { name: 'Pav', price: '₹35', image: 'PAV.jpg' },
        { name: 'Burger Bun', price: '₹20', image: 'Burger Bun.jpg' },
        { name: 'Pizza Rota', price: '₹25', image: 'Pizza Base.jpg' },
        { name: 'Veg Puff', price: '₹20', image: 'VEF PUFF.jpg' },
        { name: 'Cream Roll', price: '₹15', image: 'CREAM ROLL.jpg' },
        { name: 'Dilpasand', price: '₹15', image: 'dilpasand.jpg' },
        { name: 'Kaju Cookies (250g)', price: '₹100', image: 'Kaju Cookies.jpg' },
        { name: 'Tutti Frutti Cookies (250g)', price: '₹100', image: 'Tutti Frutti Cookies.jpg' },
        { name: 'Ragi Cookies (250g)', price: '₹100', image: 'ragi cookies.jpg' },
        { name: 'Kaju Cookies (250g)', price: '₹100', image: 'Kaju Cookies.jpg' },
        { name: 'Bun Maska ', price: '₹20', image: 'Maska Bun.jpg' },
        { name: 'Roll Cake', price: '₹15', image: 'Roll Cake.jpg' },
        { name: 'Cream Bun', price: '₹15', image: 'Cream Bun.jpg' },
        { name: 'Dilkush', price: '₹15', image: 'Dilkush.jpg' },
        { name: 'Slice Cake (250g)', price: '₹70', image: 'Slice Cake1.jpg' },
        { name: 'Bun (3 pieces)', price: '₹10', image: 'Bun.jpg' },
        { name: 'Honey Cake', price: '₹15', image: 'Honey Cake.jpg' },
        { name: 'Jam Roll Cake', price: '₹15', image: 'Jam Roll Cake.jpg' },
      ],
    },
    {
     category: 'Cake Items',
      items: [
          { name: 'Chocolate Cake (1kg)', price: '₹600', image: 'Chocolate cake.jpg' },
          { name: 'Vanilla Cake (1kg)', price: '₹600', image: 'Vanilla Cake.jpg' },
          { name: 'Pineapple Cake (1kg)', price: '₹600', image: 'Pineapple Cake.jpg' },
          { name: 'Red Velvet Cake (1kg)', price: '₹600', image: 'Red Velvet Cake.jpg' },
          { name: 'Chocolate Truffle Cake (1kg)', price: '₹600', image: 'Chocolate Truffle Cake.jpg' },
          { name: 'Plum Cake (1kg)', price: '₹600', image: 'Plum Cake.jpg' },
          { name: 'Strawberry Cake (1kg)', price: '₹600', image: 'Strawberry Cake.jpg' },
      ]
    },
    {
      category: 'Sweet Items',
      items: [
         { name: 'Jaamun (250g)', price: '₹65', image: 'jaanmun.jpg' },
        { name: 'Dharwad Pedha (250g)', price: '₹100', image: 'Dharwad Pedha.jpg' },
        { name: 'Kaju Katli (250g)', price: '₹150', image: 'kaju katli.jpg' },
        { name: 'Motichur Laddu (250g)', price: '₹60', image: 'Motichoor Ladoo.jpg' },
        { name: 'Sweet Boondhi (250g)', price: '₹50', image: 'Sweet boondi.jpg' },
        { name: 'Dryfruits Laddu (250g)', price: '₹150', image: 'dryfruits laddu.jpg' },
        { name: 'Jalebi (250g)', price: '₹50', image: 'Jalebi.jpg' },
        { name: 'Mysore Pak (250g)', price: '₹60', image: 'Mysore Pak.jpg' },
        { name: 'Ghee Mysore Pak (250g)', price: '₹150', image: 'GHEE MYSORE PAK.jpg' },
        { name: 'Kalakhand (250g)', price: '₹150', image: 'kalakhand.jpg' },
        { name: 'Balushahi (250g)', price: '₹60', image: 'Balushahi.jpg' },
        { name: 'Malpuri (250g)', price: '₹70', image: 'Malpuri.jpg' },
        { name: 'Chocolate Burfi (250g)', price: '₹100', image: 'Chocolate Burfi.jpg' },
        { name: 'Milk Burfi (250g)', price: '₹100', image: 'Milk Burfi.jpg' },
        { name: 'Rasmalai (250g)', price: '₹150', image: 'Rasmalai.jpg' },
        { name: 'Rasgulla (250g)', price: '₹150', image: 'Rasgulla.jpg' },
      ],
    },
    {
      category: 'Mixture Items',
      items: [
        { name: 'Khara Bondhi (250g)', price: '₹60', image: 'Khara Bondhi.jpg' },
        { name: 'Sev Small (250g)', price: '₹60', image: 'Sev Small.jpg' },
        { name: 'Sev Medium (250g)', price: '₹60', image: 'Sev Medium.jpg' },
        { name: 'Sev Big (250g)', price: '₹60', image: 'Sev big.jpg' },
        { name: 'Papadi (250g)', price: '₹60', image: 'Papadi.jpg' },
        { name: 'Ganthi (250g)', price: '₹60', image: 'Ganthiya.jpg' },
        { name: 'Makai Chiwda (250g)', price: '₹60', image: 'Makai Chiwada.jpg' },
        { name: 'Sobudana Chiwda (250g)', price: '₹60', image: 'Sobudana Chiwda.jpg' },
        { name: 'Mixture (250g)', price: '₹60', image: 'Mixture.jpg' },
        { name: 'Chiwda (250g)', price: '₹60', image: 'Chiwda.jpg' },
        { name: 'Dal Seva (250g)', price: '₹60', image: 'Dal Seva.jpg' },
        { name: 'Alu Samosa ', price: '₹15', image: 'Samosa.jpg' },
        { name: 'Kachori ', price: '₹15', image: 'Kachori.jpg' },
        { name: 'Bhakarwadi', price: '₹15', image: 'Bhakarwadi.jpg' },
        { name: 'Mini Samosa', price: '₹15', image: 'Mini Samosa.jpg'},
        { name: 'Plain Samosa', price: '₹15', image: 'Plain Samosa.jpg'},
        { name: 'Vegetable Samosa', price: '₹15', image: 'Vegetable Samosa.jpg' },
       
      ],
    },
  ];

const handleAddToCart = (item) => {
  const added = addToCart(item);  // your addToCart function should return true/false
  if (added) {
    setPopup({ message: "Item added successfully", type: "success" });
  } else {
    setPopup({ message: "Item already added", type: "error" });
  }

  setTimeout(() => setPopup(null), 2000);
};

return (
  <>
    {popup && (
      <div className={`alert ${popup.type}`}>
        <span className="alert-icon">{popup.type === "success" ? "✔" : "⚠"}</span>
        {popup.message}
      </div>
    )}

    <div className="menu-container" data-aos="fade-up">
      {items.map((category) => (
        <div key={category.category}>
          <h2>{category.category}</h2>
          <div className="menu-items">
            {category.items.map((item) => (
              <div key={item.name} className="menu-item">
                <img src={images(`./${item.image}`)} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.price}</p>
                  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);

}

export default Menu;
