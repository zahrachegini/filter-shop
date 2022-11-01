import React from "react";
import formatCuttency from "../utils";
// import Fade from "react-reveal/Fade";

function Cart(props) {
  const { cartItem, removeProducts } = props;
  const itemPrice = cartItem.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItemPrice = itemPrice;
  return (
    <>
      {cartItem.length === 0 ? (
        <div className="empty-price">سبد خرید خالی است</div>
      ) : (
        <div className="show-price">
          شما {cartItem.length} محصول در سبد خرید دارید
        </div>
      )}
      <div className="cart-item">
        {cartItem.map((item) => (
          <div className="product-item" key={item.id}>
            <div className="product-detail">
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
            </div>
            <div className="product-price">
              <div className="price">
                <span className="">{formatCuttency(item.price)}</span>
                <span className="qty">{item.qty} عدد</span>
              </div>
              <div className="remove-item">
                <button onClick={() => removeProducts(item)}>حذف از سبد</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <div className="total-text">مجموع قیمت</div>
        <div className="total">{formatCuttency(totalItemPrice)}</div>
      </div>
    </>
  );
}

export default Cart;
