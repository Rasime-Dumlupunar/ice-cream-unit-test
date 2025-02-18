import axios from "axios";
import { useEffect, useState } from "react";

const Toppings = () => {
  const [data, setData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4090/toppings")
      .then((res) => setData(res.data));
  }, []);

  const handleChange = (item) => {
    // elemen sepette var mı?
    const found = basket.find((i) => i.id === item.id);

    // varsa kaldır yoksa ekle
    found
      ? setBasket(basket.filter((i) => i.id !== item.id))
      : setBasket([...basket, item]);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1>Sos Çeşitleri</h1>
      <p className="p-3">
        Tanesi <span className="text-danger bg-white rounded p-1 ">3 ₺</span>
      </p>
      <h3>
        Soslar Ücreti{" "}
        <span data-testid="total" className="text-danger bg-white rounded p-1 ">
          {basket.length * 3} ₺
        </span>
      </h3>

      <div className="row p-3 mt-4 gap-3">
        {data.map((i) => {
          const found = basket.find((basketItem) => basketItem.id === i.id);

          return (
            <div
              data-testid="card"
              onClick={() => handleChange(i)}
              className={`top-card col ${found ? "active" : ""}`}
              key={i.id}
            >
              <div>
                <img src={i.imagePath} height={100} alt="topping" />
                <p>{i.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Toppings;
