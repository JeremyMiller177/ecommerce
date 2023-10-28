import { useCart } from "../hooks/useCart";
import noImage from "../assets/img/no-image.png";
import { useEffect, useState } from "react";
import { getTiposPago } from "../api/tipoPago";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Carrito = () => {
  const { items, updateItemQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [tiposPago, setTiposPago] = useState([]);
  const hasZeroQuantity = items.some((item) => item?.quantity === 0);

  const handleClick = () => {
    if (hasZeroQuantity) {
      return toast.error("Uno o más artículos tienen una cantidad de 0");
    }

    navigate("/checkout");
  };

  const handleChangeQuantity = (id, quantity) => {
    if (!/^\d+$/.test(quantity)) return;

    updateItemQuantity(id, quantity);
  };

  const handleMinus = (id, quantity) => {
    if (quantity < 1) return;

    updateItemQuantity(id, Number(quantity) - 1);
  };

  const handlePlus = (id, quantity) => {
    updateItemQuantity(id, Number(quantity) + 1);
  };

  const getTotal = () => {
    return Number(
      items.reduce((total, item) => total + item.quantity * item.data.precio, 0)
    );
  };

  const getItemSubtotal = (item) => {
    return Number(Number(item?.data.precio) * Number(item?.quantity));
  };

  useEffect(() => {
    getTiposPago().then((data) => setTiposPago(data));
  }, []);

  if (!tiposPago || tiposPago?.length === 0) {
    return;
  }

  if (items?.length === 0) {
    return (
      <div className="container d-flex flex-column gap-3 mb-5">
        <h1>Carrito</h1>

        <label>
          Tu carrito está vacío. Agrega algunos productos para continuar.
        </label>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column gap-3 mb-5">
      <h1>Carrito</h1>

      <div className="d-flex flex-row card border-0 shadow-lg w-100">
        <div className="w-50 p-5">
          <h2>Productos</h2>

          {items?.map((item) => (
            <div
              className="d-flex flex-column gap-3 border-bottom"
              key={item?.data.id}
            >
              <div className="w-100 text-end mt-3">
                <button
                  onClick={() => removeItem(item?.data?.id)}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
              </div>
              <div className="d-flex w-100" style={{ height: 150 }}>
                <div className="d-flex align-items-center justify-content-center w-50">
                  <img
                    src={item?.data?.imagen_url ?? noImage}
                    alt={item?.data?.nombre}
                    className="card-img-top img-fluid h-75 w-100 object-fit-contain"
                  />
                </div>

                <div className="d-flex flex-column justify-content-center card-body h-100 w-50">
                  <h4
                    className="card-title"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item?.data?.nombre}
                  </h4>

                  <div className="d-flex gap-2">
                    <span className="badge bg-success mb-4">
                      GTQ {item?.data?.precio}
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center input-group w-100 mb-5 ">
                <label className="me-3">Cantidad</label>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleMinus(item?.data?.id, item?.quantity)}
                >
                  -
                </button>
                <input
                  className="form-control text-center"
                  value={item?.quantity}
                  type="number"
                  onChange={(e) =>
                    handleChangeQuantity(item?.data?.id, e.target.value)
                  }
                />
                <button
                  className="btn btn-outline-primary rounded-0"
                  onClick={() => handlePlus(item?.data?.id, item?.quantity)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex flex-column gap-3 w-50 p-5">
          <div className="card border-0 bg-light p-3">
            <h2>Resumen</h2>

            {items.map((item) => {
              return (
                <div key={item?.data.id} className="d-flex flex-row">
                  <p className="me-auto">
                    {item?.data.nombre} × {item?.quantity}
                  </p>
                  <p>GTQ {getItemSubtotal(item).toFixed(2)}</p>
                </div>
              );
            })}

            <div className="border-bottom mb-2"></div>

            <div className="d-flex flex-row">
              <p className="me-auto fw-bold">Total</p>
              <p>GTQ {getTotal().toFixed(2)}</p>
            </div>

            <button
              disabled={hasZeroQuantity}
              onClick={handleClick}
              className="btn btn-primary w-100 mt-4"
            >
              Ir al checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
