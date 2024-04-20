import React, { useState, useEffect } from "react";
import {MapComponent} from "../../components";
import {BASE_URL} from "../../data/config";


const CrmMap = () => {
    const [locations, setLocations] = useState([]);
    
    useEffect(() => {
        fetch(`${BASE_URL}/crm/admin-api/addresses/list`)
            .then((response) => response.json())
            .then((data) => setLocations(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <>
            <div>CrmMap</div>
            <MapComponent locations={locations}/>
        </>
    )
}

export default CrmMap