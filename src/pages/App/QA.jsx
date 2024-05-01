import React, {useState, useEffect} from 'react';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';
const QA = () => {
    const { showToast, token } = useStateContext();
    const [qas, setQas] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const url = BASE_URL + '/crm/admin-api/qas'
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    authorization: `Token ${token}`,
                }});
            const data = await response.json()
            setQas(data)
        }
        fetchData()
    }, [])
    return (
        <div>QA</div>
    )
}

export default QA