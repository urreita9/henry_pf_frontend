import { createContext, useContext, useEffect } from 'react';

import { useSocket } from '../hooks/useSocket';
import { useSelector } from 'react-redux';

export const SocketContext = createContext();

const URL = process.env.REACT_APP_URL;

export const SocketProvider = ({ children }) => {
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(URL);

    const { user, logged } = useSelector((state) => state.userReducer);

    // const { auth } = useContext(AuthContext);

    // const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (logged) {
            conectarSocket();
        }
    }, [logged]);

    useEffect(() => {
        if (!logged) {
            desconectarSocket();
        }
    }, [logged]);

    // useEffect(() => {
    //     socket?.on('lista-usuarios', (usuarios) => {
    //         dispatch({
    //             type: types.usuariosCargados,
    //             payload: usuarios,
    //         });
    //     });
    // }, [socket, dispatch]);

    // useEffect(() => {
    //     socket?.on('mensaje-personal', (mensaje) => {
    //         dispatch({
    //             type: types.nuevoMensaje,
    //             payload: mensaje,
    //         });

    //         scrollToBottomAnimated('mensajes');
    //     });
    // }, [socket, dispatch]);

    return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
