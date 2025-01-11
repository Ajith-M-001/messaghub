/* eslint-disable react/prop-types */
import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";

// Create the SocketContext
const SocketContext = createContext();

// Custom hook to use the SocketContext
const getSocket = () => useContext(SocketContext);

// SocketProvider component
const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io("http://localhost:5000", { withCredentials: true }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
