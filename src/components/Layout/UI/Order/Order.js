import React from 'react';
import classes from './Order.module.css';
const Order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push(ingredientName + " (" + props.ingredients[ingredientName] + ")");
  }
  let ingredientJSX = ingredients.map( ing => (<span style={{
    textTransform:'capitalize',
    display:'inline-block',
    margin:'0 8px',
    border:'1px solid #eee',
    padding:'5px'}}>{ing}</span>));
  return ( 
    <div className={classes.Order}>
      <p>Ingredients: {ingredientJSX} </p>
      <p>Price: <strong>USD ${parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
   );
}
 
export default Order;