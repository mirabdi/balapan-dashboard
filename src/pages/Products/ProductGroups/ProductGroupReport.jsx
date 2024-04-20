import React, { useState, useEffect } from 'react';
import {Header, Filter} from '../../../components';
import { useParams } from 'react-router-dom';
import { BASE_URL } from 'data/config';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';

const ProductGroupReport = () => {
    const [data, setData] = useState({productData: [], categoryData: []});
    const [sheetHeight, setSheetHeight] = useState('500px');
    const { id } = useParams();
    let spreadsheet;
    const boldRight = { fontWeight: 'bold', textAlign: 'right' };
    const bold = { fontWeight: 'bold' };
    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:L1');
        // spreadsheet.numberFormat('$#,##0.00', 'F2:F31');
    }
    function onSubmit(filterData){
        const getStats = async () => {
            try {
                const response = await fetch(`${BASE_URL}/products/admin-api/product-groups/${id}/report`, {
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
                console.log(data);
                setData(data.response);
            
            } catch (error) {
                console.error('Error fetching product group report:', error);
            }
        }
        getStats();
    }
    console.log("data", data);
    return (
        <>
        <Header category="Страница" title="Отчет по группам товаров" />
        <Filter onSubmit={onSubmit}/>


        <SpreadsheetComponent 
            openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' 
            saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' 
            ref={(ssObj) => { spreadsheet = ssObj; }} 
            created={onCreated.bind(this)}
            height={sheetHeight}
            allowEditing={false} 
            >
            <SheetsDirective>
                <SheetDirective name="По товарам">
                    <RangesDirective>
                        <RangeDirective dataSource={data.productData}></RangeDirective>
                    </RangesDirective>
                    <ColumnsDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={120}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={120}></ColumnDirective>
                    </ColumnsDirective>
                </SheetDirective>
                <SheetDirective name="По категориям">
                    <RangesDirective>
                        <RangeDirective dataSource={data.categoryData}></RangeDirective>
                    </RangesDirective>
                    {/* <RowsDirective>
                        <RowDirective index={30}>
                            <CellsDirective>
                                <CellDirective index={4} value="Total Amount:" style={boldRight}></CellDirective>
                                <CellDirective formula="=SUM(F2:F30)" style={bold}></CellDirective>
                            </CellsDirective>
                        </RowDirective>
                    </RowsDirective> */}
                    <ColumnsDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={120}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={120}></ColumnDirective>
                    </ColumnsDirective>
                </SheetDirective>
            </SheetsDirective>
        </SpreadsheetComponent>
        </>
    )
};

export default ProductGroupReport;