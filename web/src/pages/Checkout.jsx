import { useCart } from "../hooks/useCart";
import noImage from "../assets/img/no-image.png";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { getTiposPago } from "../api/tipoPago";
import toast from "react-hot-toast";
import { createDetallePedido, createPedido } from "../api/pedidos";
import { useSession } from "../hooks/useSession";
import { useNavigate } from "react-router-dom";
import { RECAPTCHA_SITE_KEY } from "../utils/env";

export const Checkout = () => {
  const { items, removeAll } = useCart();
  const { session } = useSession();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tiposPago, setTiposPago] = useState([]);

  const [values, setValues] = useState({
    tipoPagoId: undefined,
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
  });

  const hasZeroQuantity = items.some((item) => item?.quantity === 0);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (hasZeroQuantity) {
      return toast.error("Uno o más artículos tienen una cantidad de 0");
    }

    setLoading(true);

    const { tipoPagoId, nombre, email, telefono, direccion } = values;

    if (items.length === 0) {
      return toast.error(
        "Tu carrito está vacío. Agrega algunos productos para continuar."
      );
    }

    if (!tipoPagoId || tipoPagoId === "Selecciona un método de pago") {
      return toast.error("Selecciona un método de pago");
    }

    if (telefono && telefono.length !== 8) {
      setLoading(false);
      return toast.error("Ingresa un número de teléfono válido. Ej: 55443322");
    }

    const { id } = await createPedido({
      usuarioId: session?.user?.id,
      tipoPagoId,
      nombre,
      email,
      telefono,
      direccion,
      total: getTotal(),
    });

    await Promise.all(
      items.map((item) => {
        return createDetallePedido({
          pedidoId: id,
          productoId: item?.data?.id,
          cantidad: item?.quantity,
          precioUnitario: item?.data?.precio,
          subtotal: getItemSubtotal(item),
        });
      })
    );

    toast.success("Tu pedido ha sido enviado correctamente.");
    removeAll();
    navigate("/productos");
    setLoading(false);
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
    <div
      className="container d-flex flex-column gap-3 mb-5"
      style={{ minHeight: "100vh" }}
    >
      <h1
        className="p-3 rounded text-white"
        style={{ backgroundColor: "#564641" }}
      >
        Checkout
      </h1>

      <div className="d-flex flex-row card border-0 shadow-lg w-100">
        <div className="w-50 p-5">
          <h2>Productos</h2>

          {items?.map((item) => (
            <div
              key={item?.data.id}
              className="d-flex w-100 border-bottom"
              style={{ height: 150 }}
            >
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

                  <span className="badge bg-primary mb-4">
                    Cantidad: {item?.quantity}
                  </span>
                </div>
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
          </div>

          <div className="card border-0 bg-light p-3">
            <div className="d-flex flex-row">
              <form className="w-100" onSubmit={handleSubmit}>
                <h2>Datos de envío</h2>

                <div className="border-bottom mb-2"></div>

                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    required
                    onChange={handleChange}
                    value={values.nombre}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="telefono"
                    name="telefono"
                    maxLength={8}
                    required
                    onChange={handleChange}
                    value={values.telefono}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    required
                    onChange={handleChange}
                    value={values.direccion}
                  />
                </div>

                <h2 className="mt-4">Método de pago</h2>

                <div className="border-bottom mb-4"></div>

                <select
                  className="form-select mb-4"
                  aria-label="Método de pago"
                  id="tipoPagoId"
                  name="tipoPagoId"
                  value={values.tipoPagoId}
                  onChange={handleChange}
                >
                  <option selected>Selecciona un método de pago</option>
                  {tiposPago.map((tipoPago) => (
                    <option key={tipoPago.id} value={tipoPago.id}>
                      {tipoPago.nombre.charAt(0).toUpperCase() +
                        tipoPago.nombre.slice(1)}
                    </option>
                  ))}
                </select>

                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleReCaptcha}
                />

                <button
                  disabled={!captcha || loading}
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                >
                  Confirmar pedido
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
