import StoreForm from '../../../components/Company/Stores/StoreForm';
import { useRouteLoaderData } from 'react-router-dom';

function EditStore() {
    const { store } = useRouteLoaderData('store-detail');
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-8 pt-5">Редактировать Магазин</h1>
            <StoreForm method="put" store={store} />
        </div>
    );
}

export default EditStore;
