import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { iniciarSesion } from "../../api/auth";
import toast from "react-hot-toast";
import { useSession } from "../../hooks/useSession";

export const InicioSesion = () => {
  const navigate = useNavigate();
  const { saveSession } = useSession();

  const [values, setValues] = useState({
    email: "",
    contrasena: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { email, contrasena } = values;

    const data = await iniciarSesion({
      email,
      contrasena,
    });

    if (!data) {
      return setLoading(false);
    }

    if (!data?.session?.user) {
      setLoading(false);
      return toast.error("Credenciales inválidas");
    }

    saveSession(data.session);

    toast.success(`Bienvenido ${data.session?.user?.nombre}`);
    navigate("/productos");
    setLoading(false);
  };

  return (
    <main className="container-fluid" style={{ minHeight: "100vh" }}>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="d-flex flex-column align-items-center shadow-lg p-5 mb-5 bg-white rounded"
          style={{ width: 650 }}
        >
          <h1 className="display-6 text-primary">Iniciar sesión</h1>
          <form
            id="formulario-inicio-sesion"
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-3 align-items-center w-100"
          >
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
                type="text"
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

            <div className="d-flex flex-column align-items-center gap-3 w-100">
              <button
                className="btn btn-primary w-100"
                id="iniciar-sesion"
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}{" "}
                Iniciar sesión
              </button>

              <Link to="/registro">
                ¿No tienes una cuenta? ¡Regístrate ahora!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};
