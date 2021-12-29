import './product.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lowicon from '../../assets/lowicon.png';
import moderateicon from '../../assets/moderateicon.png';
import highicon from '../../assets/highicon.png';
import { FaHeart } from 'react-icons/fa';

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [nutrilevels, setNutrilevels] = useState([]);
  const [isFavorite, setIsFavorite] = useState();

  const [favorites, setFavorites] = useState(() => {
    const localFavorites = localStorage.getItem('favorites');
    return localFavorites ? JSON.parse(localFavorites) : [];
  });

  const addFavorites = (isFavorite) => {
    if (!isFavorite) {
      setFavorites([...favorites, product]);
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, product])
      );
    } else {
      const newFavorites = favorites.filter(
        (favorite) => favorite._id != product._id
      );
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${params.id}.json`)
      .then((res) => res.json())
      .then((datas) => {
        setProduct(datas.product);
        setNutrilevels(datas.product.nutrient_levels);
      })
      .catch(() => 'Error');
    const localFavorites = localStorage.getItem('favorites');
    localFavorites
      ? JSON.parse(localFavorites)
      : localStorage.setItem('favorites', []);
    if (localFavorites != undefined) {
      localFavorites.includes(params.id) && setIsFavorite(true);
    }
  }, []);

  return (
    <section className="Umami product">
      <div className="productIngredient">
        <div className="title">
          {product.brands && <h1>{product.brands}</h1>}
          <div
            id="favorite"
            className={isFavorite ? 'isFavorite' : 'notFavorite'}
            onClick={() => {
              handleFavorite();
              addFavorites(isFavorite);
            }}
            onKeyDown={() => {
              handleFavorite();
              addFavorites(isFavorite);
            }}
            role="button"
            tabIndex={0}
          >
            <FaHeart />
          </div>
        </div>
        {product.generic_name && <h3>{product.generic_name} </h3>}
        {product.ingredients_text && (
          <p className="ingredients">{product.ingredients_text} </p>
        )}

        <h3 className="valeursnutri">Valeurs nutritionnelles</h3>
        <div className="imageList">
          {product.image_front_small_url && (
            <img
              className="image"
              src={product.image_front_small_url}
              alt="product"
            />
          )}

          <ul className="ullist">
            {nutrilevels['saturated-fat'] && (
              <li className="titlelist">
                <span
                  className={`saturatedFat ${nutrilevels['saturated-fat']}`}
                ></span>
                Graisse saturée
              </li>
            )}
            {nutrilevels.salt && (
              <li className="titlelist">
                <span className={`salt ${nutrilevels.salt}`}></span>
                Teneur en sel
              </li>
            )}
            {nutrilevels.sugars && (
              <li className="titlelist">
                <span className={`sugars ${nutrilevels.sugars}`}></span>
                Teneur en sucre
              </li>
            )}
          </ul>
        </div>
        <div className="labeldiv">
          <ul className="ullabel">
            {product['nova_group'] && (
              <li className="label">
                <span className={`nova nova${product['nova_group']}`}></span>{' '}
                Nova score
              </li>
            )}
            {product.nutriscore_grade && (
              <li className="label">
                <span
                  className={`nutriscore ${product.nutriscore_grade}`}
                ></span>
                Nutri score
              </li>
            )}
          </ul>
        </div>
        <p className="textlevel">
          L&apos;ensemble des éléments indiqués sont basés sur l&apos;API
          openfoodfacts.
        </p>
        <p className="textlevel">
          Les valeurs nutrionnelles sont évaluées sous trois niveaux : <br />
          faible <img className="levelicon" src={lowicon} alt="faible" />,
          modéré <img className="levelicon" src={moderateicon} alt="modérée" />
          et élevée. <img className="levelicon" src={highicon} alt="élevée" />
        </p>
        <p className="textlevel">
          La classification NOVA assigne un groupe aux produits alimentaires en
          fonction du degré de transformation qu&apos;ils ont subi.
        </p>
      </div>
    </section>
  );
};

export default Product;
