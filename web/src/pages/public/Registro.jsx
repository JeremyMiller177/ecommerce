import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { crearUsuario } from "../../api/auth";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../../utils/env";

export const Registro = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    direccion: "",
    ciudad: "",
    telefono: "",
  });
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const {
      nombre,
      email,
      contrasena,
      confirmarContrasena,
      direccion,
      ciudad,
      telefono,
    } = values;

    if (contrasena.length < 5) {
      setLoading(false);
      return toast.error("Tu contraseña debe tener al menos 5 caracteres");
    }

    if (contrasena !== confirmarContrasena) {
      setLoading(false);
      return toast.error("Las contraseñas no coinciden");
    }

    if (telefono && telefono.length !== 8) {
      setLoading(false);
      return toast.error("Ingresa un número de teléfono válido. Ej: 55443322");
    }

    await crearUsuario({
      nombre,
      email,
      contrasena,
      direccion,
      ciudad,
      telefono,
    });

    toast.success("Tu cuenta ha sido creada. Inicia sesión para continuar.");
    navigate("/inicio-sesion");
    setLoading(false);
  };

  return (
    <main className="container-fluid">
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="d-flex flex-column align-items-center shadow-lg p-5 mb-5 bg-white rounded"
          style={{ width: 650 }}
        >
          <h1 className="display-6 text-primary">Registro</h1>
          <form
            id="formulario-registro"
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center gap-3 w-100"
          >
            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="form-control input-formulario"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                required
                type="text"
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="email">
                Correo electrónico
              </label>
              <input
                className="form-control input-formulario"
                id="email"
                name="email"
                placeholder="Correo electrónico"
                required
                type="email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="contrasena">
                Contraseña
              </label>
              <input
                className="form-control input-formulario"
                id="contrasena"
                name="contrasena"
                placeholder="Contraseña"
                required
                type="password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="confirmarContrasena">
                Confirmar contraseña
              </label>
              <input
                className="form-control input-formulario"
                id="confirmarContrasena"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña"
                required
                type="password"
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="direccion">
                Dirección
              </label>
              <input
                className="form-control input-formulario"
                id="direccion"
                name="direccion"
                placeholder="Dirección"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="ciudad">
                Ciudad
              </label>
              <input
                className="form-control input-formulario"
                id="ciudad"
                name="ciudad"
                placeholder="Ciudad"
                required
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ width: "100%" }}>
              <label className="label-formulario" htmlFor="telefono">
                Teléfono
              </label>
              <input
                className="form-control input-formulario"
                id="telefono"
                name="telefono"
                placeholder="Teléfono"
                required
                onChange={handleChange}
              />
            </div>

            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleReCaptcha}
            />

            <div className="d-flex flex-column align-items-center gap-3 w-100">
              <button
                className="btn btn-primary w-100"
                id="iniciar-sesion"
                type="submit"
                disabled={loading || !captcha}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                Crear cuenta
              </button>

              <Link to="/inicio-sesion">
                ¿Ya tienes una cuenta? ¡Inicia sesión!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
