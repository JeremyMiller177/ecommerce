import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

export const SessionContext = createContext();

export const SessionConsumer = SessionContext.Consumer;

export const SessionContextProvider = (props) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, []);

  const saveSession = useCallback((data) => {
    setSession(data);
    localStorage.setItem("session", JSON.stringify(data));
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
    localStorage.removeItem("session");
  }, []);

  const contextValue = useMemo(
    () => ({ session, saveSession, clearSession }),
    [session, saveSession, clearSession]
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {props.children}
    </SessionContext.Provider>
  );
};
