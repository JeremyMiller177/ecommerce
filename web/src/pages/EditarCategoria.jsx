import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "../utils/env";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCategoria, updateCategoria } from "../api/categorias";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { can } from "../utils/can";

export const EditarCategoria = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useSession();

  const [values, setValues] = useState({
    categoriaId: undefined,
    nombre: "",
  });

  const handleReCaptcha = (value) => {
    setCaptcha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userCan = await can(session?.user?.id, "EDITAR_CATEGORIA");

    if (!userCan) {
      return toast.error(
        "El usuario no tiene permisos para realizar esta acción."
      );
    }

    const { categoriaId, nombre } = values;

    await updateCategoria(
      id,
      {
        categoriaId,
        nombre,
      },
      session?.user?.id
    );

    toast.success("La Categoría ha sido actualizada correctamente.");
    navigate("/admin/categorias");
    setLoading(false);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getCategoria(id).then((data) => {
      setValues({
        nombre: data.nombre,
      });
    });
  }, [id]);

  return (
    <div
      className="container d-flex flex-column gap-3 mb-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="card border-0 shadow-lg bg-light p-3">
        <h1>Editar Categoria</h1>

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
