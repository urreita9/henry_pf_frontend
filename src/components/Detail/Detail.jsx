import React from 'react';
import { useParams } from 'react-router-dom';

export const Detail = () => {
	const { id } = useParams();
	return <div>Hola {id}</div>;
};
