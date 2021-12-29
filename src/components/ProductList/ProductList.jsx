import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import Average from '../Average/Average';
import './productList.css';
import telephoneUmami from '../../assets/telephoneUmami.png';
import favorisProd from '../../assets/favorisimage.jpeg';
import pcUmami from '../../assets/pcumami.png';
import scantel from '../../assets/telephonescan.png';
function ProductList({ products, handleDelete, addFavorites }) {
  return (
    <>
      <div className="ProductList">
        {products == '' ? (
          <>
            <div className="accueil">
              <div className="accueilGlobal">
                <div className="accueilCard">
                  <img
                    src={telephoneUmami}
                    alt="Umami Desktop"
                    className="imgAccueil"
                  />
                  <hr className="ligne"></hr>
                  <p className="accueilTitre">
                    Une application disponible sur mobile
                  </p>
                </div>
                <div className="accueilCard">
                  <img
                    src={scantel}
                    alt="Umami Desktop"
                    className="imgAccueil4"
                  />
                  <hr className="ligne"></hr>
                  <p className="accueilTitre">Scannez vos produits</p>
                </div>

                <div className="accueilCard">
                  <img
                    src={pcUmami}
                    alt="Umami Desktop"
                    className="imgAccueil2"
                  />
                  <hr className="ligne"></hr>
                  <p className="accueilTitre">
                    Calculez votre Umami en un clic
                  </p>
                </div>
                <div className="accueilCard">
                  <img
                    src={favorisProd}
                    alt="Umami Desktop"
                    className="imgAccueil4"
                  />
                  <hr className="ligne"></hr>
                  <p className="accueilTitre">Vos favoris à portée de main</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                productName={product.product_name}
                image={product.image_front_small_url}
                nutriscoreGrade={product.nutriscore_grade}
                handleDelete={handleDelete}
                addFavorites={addFavorites}
              />
            ))}
          </>
        )}
      </div>
      {products.length >= 2 ? <Average products={products} /> : null}
    </>
  );
}

ProductList.propTypes = {
  products: PropTypes.array,
  id: PropTypes.string,
  productName: PropTypes.string,
  image: PropTypes.string,
  nutriscoreGrade: PropTypes.string,
};

export default ProductList;
