import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/env";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { can } from "../utils/can";
import { getUsuario, updateUsuario } from "../api/usuarios";

export const EditarUsuario = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const userId = session?.user?.id;

  const [values, setValues] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    pais: "",
    telefono: "",
  });

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userCan = await can(session?.user?.id, "EDITAR_USUARIO");

    if (!userCan) {
      return toast.error(
        "El usuario no tiene permisos para realizar esta acción."
      );
    }

    const { nombre, email, direccion, ciudad, pais, telefono } = values;

    await updateUsuario(
      id,
      {
        nombre,
        email,
        direccion,
        ciudad,
        pais,
        telefono,
      },
      session?.user?.id
    );

    toast.success("El Usuario ha sido actualizado correctamente.");
    navigate("/admin/usuarios");
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getUsuario(id, userId).then((data) => {
      setValues({
        nombre: data.nombre,
        email: data.email,
        direccion: data.direccion,
        ciudad: data.ciudad,
        pais: data.pais,
        telefono: data.telefono,
      });
    });
  }, [id, userId]);

  return (
    <div className="container d-flex flex-column gap-3 mb-5">
      <div className="card border-0 shadow-lg bg-light p-3">
        <h1>Editar Usuario</h1>

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
                value={values?.nombre}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                disabled
                id="email"
                name="email"
                required
                onChange={handleChange}
                value={values?.email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input
                type="text"
                className="form-control"
                id="direccion"
                name="direccion"
                required
                onChange={handleChange}
                value={values?.direccion}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                className="form-control"
                id="ciudad"
                name="ciudad"
                required
                onChange={handleChange}
                value={values?.ciudad}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="pais" className="form-label">
                Pais
              </label>
              <input
                type="text"
                className="form-control"
                id="pais"
                name="pais"
                required
                onChange={handleChange}
                value={values?.pais}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="telefono" className="form-label">
                Telefono
              </label>
              <input
                type="number"
                className="form-control"
                id="telefono"
                name="telefono"
                required
                onChange={handleChange}
                value={values?.telefono}
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
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
