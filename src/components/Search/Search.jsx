import { useState } from 'react';
import './search.css';
// import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import ProductList from '../ProductList/ProductList';
import LogoIconPhoto from '../../assets/icone_appareil_photo.svg';
import { IoIosPower } from 'react-icons/io';
const Search = () => {
  const [products, setProducts] = useState(() => {
    const localProducts = localStorage.getItem('products');
    return localProducts ? JSON.parse(localProducts) : [];
  });
  const [scan, setScan] = useState(false);
  const [data, setData] = useState('');
  const [favorites, setFavorites] = useState(() => {
    const localFavorites = localStorage.getItem('favorites');
    return localFavorites ? JSON.parse(localFavorites) : [];
  });
  const handleSearchValue = (e) => {
    window.navigator.vibrate(100);
    setData(e.target.value);
  };

  const addFavorites = (id, isFavorite) => {
    if (!isFavorite) {
      const newFavorite = products.find((product) => product._id === id);
      setFavorites([...favorites, newFavorite]);
      localStorage.setItem(
        'favorites',
        JSON.stringify([...favorites, newFavorite])
      );
    } else {
      const newFavorites = favorites.filter((favorite) => favorite._id != id);
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const handleDelete = (id) => {
    const del = window.confirm('Etes-vous sûr ?');
    if (del) {
      const newProductList = products.filter((product) => product._id !== id);
      setProducts(newProductList);
      localStorage.setItem('products', JSON.stringify(newProductList));
    }
  };

  const handleErrors = (res) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  };

  const userAction = async (data) => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
      .then(handleErrors)
      .then((res) => res.json())
      .then((datas) => {
        if (datas.product) {
          const productAlreadyThere = products.find((e) => e._id === data);
          if (!productAlreadyThere) {
            setProducts([...products, datas.product]);
            localStorage.setItem(
              'products',
              JSON.stringify([...products, datas.product])
            );
          } else alert('Produit déjà ajouté');
        } else alert('Insérez un code barre valide');
        setData('');
      })

      .catch((error) => error);
  };

  return (
    <div className="mainSearch">
      <div className="searchtext">
        <p className="textSearch">
          Quel produit souhaitez-vous ajouter à votre Umami ?
        </p>
        <p className="par2">
          Une application simple qui vous permettra de connaitre en un clic le
          nutriscore global de votre panier.
        </p>
        <div
          className={`buttonScan ${scan ? 'buttonScan' : 'buttonScanOff'}`}
          onClick={() => setScan(false)}
          role="button"
          tabIndex={0}
        >
          <IoIosPower size={32} />
        </div>
        {/* {scan && (
          <BarcodeScannerComponent
            className="visio"
            onUpdate={(err, result) => {
              if (result) {
                userAction(result.text);
                setScan(false);
              }
            }}
          />
        )} */}
        <div className="search">
          <div className="scandiv">
            <input
              value={data}
              onChange={handleSearchValue}
              type="text"
              id="input"
              name="input"
              required
              size="100%"
              placeholder="Entrer votre code barre..."
              className="inputSearch"
            />

            <img
              className="logoIconPhoto"
              src={LogoIconPhoto}
              alt="logo scan"
              onClick={() => setScan(!scan)}
            />
          </div>
          <button
            className="buttonadd"
            label="text"
            type="button"
            onClick={() => userAction(data)}
          >
            <span>Ajouter</span>
          </button>
        </div>
      </div>
      <ProductList
        products={products}
        addFavorites={addFavorites}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Search;
