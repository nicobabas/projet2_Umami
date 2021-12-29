import './myUmami.css';
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useState } from 'react';
import { CgShoppingCart } from 'react-icons/cg';

const MyUmami = () => {
  const [favorites, setFavorites] = useState(() => {
    const localFavorites = localStorage.getItem('favorites');
    return localFavorites ? JSON.parse(localFavorites) : [];
  });

  const addFavorites = (id) => {
    const newFavorites = favorites.filter((favorite) => favorite._id != id);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isInFavorites = true;

  return (
    <section className="Umami MyFavorites">
      <h1>Mes favoris</h1>
      <div className="MyFavorites-list">
        {favorites == '' ? (
          <>
            <div className="umamivide">
              <CgShoppingCart className="card" />
              <p>
                Vous n&apos;avez pas de favoris.
                <br /> Ajoutez-en dans votre panier Umami.
              </p>
            </div>
          </>
        ) : (
          <>
            {favorites.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                productName={product.product_name}
                image={product.image_front_small_url}
                nutriscoreGrade={product.nutriscore_grade}
                addFavorites={addFavorites}
                isInFavorites={isInFavorites}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default MyUmami;
