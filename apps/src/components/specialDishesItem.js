import React from "react";
import "./../styles/components/specialDishesItem.css";

const SpecialDishesItem = ({ name, price, src }) => {
    return (
        <div className="special-dishes-item">
            <div className="special-dishes-item-image">
                <img src={src} alt={name} />
            </div>
            <div className="special-dishes-item-info">
                <p className="special-dishes-item-name">{name}</p>
                <span className="special-dishes-item-price">
                    {new Intl.NumberFormat("vi-VN").format(price)}
                </span>
                <span> VND</span>
            </div>
        </div>
    );
};

export default SpecialDishesItem;
