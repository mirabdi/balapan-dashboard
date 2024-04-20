import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Filter } from '../../../components';
import { BASE_URL } from '../../../data/config';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, ColumnDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';

const SupplierGroupReport = () => {
    const [data, setData] = useState({suppliersData: []});
    const [sheetHeight, setSheetHeight] = useState('500px');
    const { id } = useParams();
    let spreadsheet;

    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:G1');
    }

    function onSubmit(filterData){
        const getStats = async () => {
            try {
                const response = await fetch(`${BASE_URL}/parties/admin-api/supplier-groups/${id}/report`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filterData),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setData(data.response);
            } catch (error) {
                console.error('Error fetching supplier group report:', error);
            }
        }
        getStats();
    }

    return (
        <>
            <Header category="Страница" title="Отчет по группам поставщиков" />
            <Filter onSubmit={onSubmit} />
            <SpreadsheetComponent 
                openUrl={`${BASE_URL}/spreadsheet/open`} 
                saveUrl={`${BASE_URL}/spreadsheet/save`} 
                ref={(ssObj) => { spreadsheet = ssObj; }} 
                created={onCreated}
                height={sheetHeight}
                allowEditing={false} 
            >
                <SheetsDirective>
                    <SheetDirective name="Поставщики">
                        <RangesDirective>
                            <RangeDirective dataSource={data.suppliersData}></RangeDirective>
                        </RangesDirective>
                        <ColumnsDirective>
                            {/* Adjust the columns as per your supplier data */}
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </>
    );
};

export default SupplierGroupReport;
