import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/env";
import { useState } from "react";
import toast from "react-hot-toast";
import { createCategoria } from "../api/categorias";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { can } from "../utils/can";

export const CrearCategoria = () => {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const [values, setValues] = useState({
    nombre: "",
  });

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userCan = await can(session?.user?.id, "CREAR_CATEGORIA");

    if (!userCan) {
      return toast.error(
        "El usuario no tiene permisos para realizar esta acción."
      );
    }

    const { nombre } = values;

    await createCategoria(
      {
        nombre,
      },
      session?.user?.id
    );

    toast.success("La categoría ha sido creada correctamente.");
    navigate("/categorias");
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className="container d-flex flex-column gap-3 mb-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="card border-0 shadow-lg bg-light p-3">
        <h3>Crear Categoría</h3>

        <div className="d-flex flex-row">
          <form className="w-100" onSubmit={handleSubmit}>
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
