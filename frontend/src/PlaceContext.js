import { createContext, useEffect, useState } from "react";

const PlaceContext = createContext();

export function PlaceContextProvider(props) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    setLoading(false);
    fetch(`${process.env.REACT_APP_SERVER_URL}/category`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/platform`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        setPlatforms(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_URL}/payment`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.data);
        setPaymentMethods(res.data);
      })
      .finally(() => setLoading(false));
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
