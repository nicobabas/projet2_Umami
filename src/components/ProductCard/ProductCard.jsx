import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import './productCard.css';

function ProductCard({
  productName,
  image,
  nutriscoreGrade,
  id,
  handleDelete,
  addFavorites,
  isInFavorites,
}) {
  const divStyle = {
    backgroundImage: 'url(' + image + ')',
  };

  const [isFavorite, setIsFavorite] = React.useState();

  React.useEffect(() => {
    const localFavorites = localStorage.getItem('favorites');
    localFavorites
      ? JSON.parse(localFavorites)
      : localStorage.setItem('favorites', []);
    if (localFavorites != undefined)
      localFavorites.includes(id) && setIsFavorite(true);
  }, []);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="ProductCard">
      <div className="ProductCard-edit">
        <div
          id="favorite"
          className={isFavorite ? 'isFavorite' : 'notFavorite'}
          onClick={() => {
            handleFavorite();
            addFavorites(id, isFavorite);
          }}
          onKeyDown={() => {
            handleFavorite();
            addFavorites(id, isFavorite);
          }}
          role="button"
          tabIndex={0}
        >
          <FaHeart />
        </div>
        {!isInFavorites ? (
          <div
            className="delete"
            onClick={() => handleDelete(id)}
            onKeyDown={() => handleDelete(id)}
            role="button"
            tabIndex={0}
          >
            <IoIosCloseCircleOutline />
          </div>
        ) : null}
      </div>
      <div className="ProductCard-container">
        <div className="ProductCard-image">
          <Link to={`/product/${id}`}>
            <div className="ProductCard-imagebackground" style={divStyle}></div>
          </Link>
        </div>
        <h3 className="productName">{productName}</h3>
        <hr
          style={{
            color: '#d6e7ed',
            width: 200,
          }}
        />
        <div className="details">
          {nutriscoreGrade && (
            <span className={`nutriscore ${nutriscoreGrade}`}></span>
          )}
          <Link to={`/product/${id}`}>Details produit</Link>
        </div>
      </div>
    </div>
  );
}
ProductCard.propTypes = {
  id: PropTypes.string,
  productName: PropTypes.string,
  image: PropTypes.string,
  nutriscoreGrade: PropTypes.string,
};

export default ProductCard;
