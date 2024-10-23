import { useEffect, useState } from "react";
import { getProducto } from "../../api/productos";
import { Link, useParams } from "react-router-dom";
import noImage from "../../assets/img/no-image.png";
import shoppingCartIcon from "../../assets/img/shopping-cart-icon.png";
import "./../styles.css";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import { createResena, getResenas } from "../../api/resenas";
import ReactStars from "react-rating-stars-component";
import { useSession } from "../../hooks/useSession";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../../utils/env";

export const Producto = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { session } = useSession();

  const [producto, setProducto] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [resenas, setResenas] = useState([]);
  const [captcha, setCaptcha] = useState(null);

  const [values, setValues] = useState({
    calificacion: 5,
    comentario: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleChangeQuantity = (e) => {
    if (!/^\d+$/.test(e.target.value)) return;

    setQuantity(e.target.value);
  };

  const handleMinus = () => {
    if (quantity < 1) return;

    setQuantity(Number(quantity) - 1);
  };

  const handlePlus = () => {
    setQuantity(Number(quantity) + 1);
  };

  const handleClick = () => {
    if (quantity < 1) {
      return toast.error("Ingresa una cantidad válida");
    }

    addItem({ data: producto, quantity });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { calificacion, comentario } = values;

    await createResena({
      sessionUserId: session?.user?.id,
      productoId: id,
      usuarioId: session?.user?.id,
      calificacion,
      comentario,
    });

    toast.success("Gracias, tu reseña ha sido publicada.");

    const newResenas = await getResenas(id);
    setResenas(newResenas);
    setLoading(false);
  };

  const parseDate = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const anio = fecha.getFullYear().toString();

    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    getResenas(id).then((data) => setResenas(data));
    getProducto(id).then((data) => setProducto(data));
    setLoading(false);
  }, [id]);

  if (loading || !producto) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid w-75">
      <nav
        aria-label="breadcrumb"
        style={{
          backgroundColor: "#564641",
          borderRadius: 5,
        }}
      >
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: "white" }}>
              Productos
            </Link>
          </li>

          <li className="breadcrumb-item active text-white" aria-current="page">
            {producto?.id}
          </li>
        </ol>
      </nav>

      <div className="card border-0 shadow-lg w-100 mb-5">
        <div className="d-flex" style={{ height: 500 }}>
          <div className="d-flex align-items-center justify-content-center w-50">
            <img
              src={producto?.imagen_url ?? noImage}
              alt={producto?.nombre}
              className="card-img-top img-fluid h-100 w-100 object-fit-contain"
            />
          </div>

          <div className="d-flex flex-column justify-content-between card-body shadow-lg h-100 w-50">
            <div className="h-100">
              <h2 className="card-title">{producto?.nombre}</h2>

              <p className="card-text">{producto?.descripcion}</p>

              <span className="badge bg-success mb-4">
                GTQ {producto?.precio}
              </span>

              <div className="d-flex align-items-center input-group w-50">
                <label className="me-3">Cantidad</label>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleMinus}
                >
                  -
                </button>
                <input
                  className="form-control text-center"
                  value={quantity}
                  type="number"
                  onChange={handleChangeQuantity}
                />
                <button
                  className="btn btn-outline-primary rounded-0"
                  onClick={handlePlus}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleClick}
              className="btn btn-primary d-flex justify-content-center align-items-center gap-1 w-100"
              style={{ backgroundColor: "#564641" }}
            >
              Agregar al carrito{" "}
              <img
                src={shoppingCartIcon}
                alt={producto?.nombre}
                style={{ width: 20 }}
              />
            </button>
          </div>
        </div>

        <div className="bg-white">
          <div className="card shadow-lg p-3 m-3 border-0 mb-3">
            {session ? (
              <form
                className="d-flex flex-column p-3 gap-3"
                onSubmit={handleSubmit}
              >
                <div className="d-flex flex-column gap-3">
                  <label htmlFor="direccion" className="form-label">
                    Danos tu valiosa reseña sobre este producto
                  </label>

                  <div className="d-flex align-items-center gap-2">
                    <label>Calificación</label>
                    <ReactStars
                      count={5}
                      value={values.calificacion}
                      size={24}
                      activeColor="#ffd700"
                      onChange={(newRating) =>
                        setValues({ ...values, calificacion: newRating })
                      }
                    />
                  </div>

                  <textarea
                    id="comentario"
                    name="comentario"
                    className="form-control"
                    rows="3"
                    required
                    onChange={handleChange}
                    value={undefined}
                    style={{ resize: "none" }}
                  />
                </div>

                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleReCaptcha}
                />

                <button
                  disabled={!captcha || loading}
                  type="submit"
                  className="btn btn-primary d-flex justify-content-center align-items-center gap-1 w-100"
                >
                  Publicar
                </button>
              </form>
            ) : (
              <div className="d-flex flex-column p-3 gap-3">
                <Link to="/inicio-sesion">
                  Inicia sesión para publicar una reseña
                </Link>
              </div>
            )}

            <h3 className="ps-3 pt-3">Comentarios ({resenas?.length})</h3>

            {resenas.map((resena) => (
              <div key={resena.id} className="card-body">
                <ReactStars
                  edit={false}
                  count={5}
                  value={resena.calificacion}
                  size={24}
                  activeColor="#ffd700"
                />
                <p className="card-text">{resena.comentario}</p>
                <p className="card-text">
                  <small className="text-muted">
                    {parseDate(resena.fecha)}
                  </small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
