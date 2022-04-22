import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { updateOpStatus } from '../../redux/actions/operationActions';
import { Operation } from '../Operation/Operation';

export const Payment = () => {
	const dispatch = useDispatch();
	const { operation } = useSelector((state) => state.operationsReducer);

	const [searchParams] = useSearchParams();
	const token = localStorage.getItem('token');
	// const status = searchParams.get('collection_status');
	const idOperation = searchParams.get('preference_id');
	const idPayment = searchParams.get('merchant_order_id');

	useEffect(() => {
		dispatch(updateOpStatus(idOperation, idPayment, token));
	}, []);

	return <> {operation?.id && <Operation {...operation} />}</>;
};

// price,
// id,
// timeLapse,
// userId,
// caretakerId,
// status,
