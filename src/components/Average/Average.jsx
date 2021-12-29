/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import './average.css';
//import ProductCard from '../ProductCard/ProductCard';

const Average = ({ products }) => {
  const [moyenne, setMoyenne] = useState();

  React.useEffect(() => {
    const nutriscores = [];
    products.map((product) => nutriscores.push(product.nutriscore_grade));

    const newArray = nutriscores.filter(
      (nutriscore) => nutriscore !== undefined
    );

    let sum = 0;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] === 'a') {
        sum = sum + 1;
      }
      if (newArray[i] === 'b') {
        sum = sum + 2;
      }
      if (newArray[i] === 'c') {
        sum = sum + 3;
      }
      if (newArray[i] === 'd') {
        sum = sum + 4;
      }
      if (newArray[i] === 'e') {
        sum = sum + 5;
      }
    }
    let moyenne = Math.round(sum / newArray.length);
    if (moyenne === 0) {
      moyenne = null;
    }
    if (moyenne === 1) {
      moyenne = 'A';
    }
    if (moyenne === 2) {
      moyenne = 'B';
    }
    if (moyenne === 3) {
      moyenne = 'C';
    }
    if (moyenne === 4) {
      moyenne = 'D';
    }
    if (moyenne === 5) {
      moyenne = 'E';
    }

    setMoyenne(moyenne);
  }, [products]);

  return (
    <div className="averageglobal">
      <div className="averagediv">
        <h3 className="scorepar">SCORE </h3>
        <div className={`average ${moyenne}`}></div>
      </div>
    </div>
  );
};

export default Average;
