import { createContext, useEffect, useState } from "react";

const PlaceContext = createContext();

export function PlaceContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [platforms, setPlatforms] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/category`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setCategories(res.data);
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/platform`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPlatforms(res.data);
      });

    fetch(`${process.env.REACT_APP_SERVER_URL}/payment`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setPaymentMethods(res.data);
      });

    setLoading(false);
  }, []);

  const value = {
    categories,
    platforms,
    paymentMethods,
  };

  return (
    <PlaceContext.Provider value={value}>
      {!loading && props.children}
    </PlaceContext.Provider>
  );
}

export default PlaceContext;
