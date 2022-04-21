import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { updateOpStatus } from '../../redux/actions/operationActions';
import { Operation } from '../Operation/Operation';

export const Payment = () => {
	const dispatch = useDispatch();
	const { operation } = useSelector((state) => state.operationsReducer);

	const [searchParams] = useSearchParams();
	//preference_id=1109688142-aac6c2dd-e12f-4aeb-b1d8-93e6a1fc23c6
	const status = searchParams.get('collection_status');
	const id = searchParams.get('preference_id');

	useEffect(() => {
		dispatch(updateOpStatus(id, status));
	}, []);

	return <> {operation?.id && <Operation {...operation} />}</>;
};

// price,
// id,
// timeLapse,
// userId,
// caretakerId,
// status,
