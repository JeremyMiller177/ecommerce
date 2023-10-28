import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/env";
import { useState, useEffect } from "react";
import { getCategorias } from "../api/categorias";
import toast from "react-hot-toast";
import { createProducto } from "../api/productos";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { can } from "../utils/can";

export const CrearProducto = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const [values, setValues] = useState({
    categoriaId: undefined,
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userCan = await can(session?.user?.id, "CREAR_PRODUCTO");

    if (!userCan) {
      return toast.error(
        "El usuario no tiene permisos para realizar esta acción."
      );
    }

    const { categoriaId, nombre, descripcion, precio } = values;

    if (!categoriaId || categoriaId === "Selecciona una categoría") {
      return toast.error("Selecciona una categoría");
    }

    await createProducto(
      {
        categoriaId,
        nombre,
        descripcion,
        precio,
      },
      session?.user?.id
    );

    toast.success("El producto ha sido creado correctamente.");
    navigate("/productos");
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getCategorias().then((data) => setCategorias(data));
  }, []);

  return (
    <div className="container d-flex flex-column gap-3 mb-5">
      <div className="card border-0 shadow-lg bg-light p-3">
        <h1>Crear producto</h1>

        <div className="d-flex flex-row">
          <form className="w-100" onSubmit={handleSubmit}>
            <div className="border-bottom mb-2"></div>

            <label>Categoría</label>
            <select
              className="form-select mb-4"
              aria-label="Categorías"
              id="categoriaId"
              name="categoriaId"
              required
              value={values.categoriaId}
              onChange={handleChange}
            >
              <option selected>Selecciona una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre.charAt(0).toUpperCase() +
                    categoria.nombre.slice(1)}
                </option>
              ))}
            </select>

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
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                required
                onChange={handleChange}
                value={values.descripcion}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Precio
              </label>
              <input
                type="number"
                className="form-control"
                id="precio"
                name="precio"
                required
                onChange={handleChange}
                value={values.precio}
              />
            </div>

            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleReCaptcha}
            />

            <button
              disabled={!captcha || loading}
              type="submit"
              className="btn btn-primary w-100 mt-4"
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
