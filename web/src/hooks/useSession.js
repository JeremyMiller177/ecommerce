import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";

export const useSession = () => {
  const { session, saveSession, clearSession } = useContext(SessionContext);

  return { session, saveSession, clearSession };
};
