import React from 'react'

import { BASE_URL } from '../../../data/config';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective, Cell } from '@syncfusion/ej2-react-spreadsheet';

function getCellAddress(rowIdx, colIdx) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const colLetter = alphabet.charAt(colIdx % 26);
    const rowNumber = rowIdx + 1; // Adjusting for 0-based index
    return `${colLetter}${rowNumber}`;
}


const ProductGroupAddProducts = () => {
    let spreadsheet;
    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:C1');
    }

    const handleCheckProducts = async () => {
        const sheet = spreadsheet.sheets[0];
        const data = sheet.rows;
        console.log(data, "data")
        const rowCount = data.length;
        for (let i = 1; i < rowCount; i++) { 
        // console.log(i, "iteration", data[i].cells[0])
        let productBarcode, productName;
        try{
            productBarcode = data[i].cells[0].value;
            productName = data[i].cells[1].value;
        }
        catch (error){
            console.log("error", error)
        }
        if(productBarcode === undefined){
            productBarcode = ""
        }
        if(productName === undefined){
            productName = ""
        }


        try {
            const response = await fetch(`${BASE_URL}/products/admin-api/products?barcode=${productBarcode}&name=${productName}`);
            const result = await response.json();
            
            const status = result.response ? 'Found' : 'Not Found';
            const statusColor = status === 'Found' ? '#10c469' : '#ff5b5b';
            const message  = result.message || 'Product not found';
            spreadsheet.updateCell({ value: status }, getCellAddress(i, 2));
            spreadsheet.cellFormat({ color: statusColor }, getCellAddress(i, 2));
            spreadsheet.updateCell({ value: message }, getCellAddress(i, 3));
        
        } catch (error) {
            console.error('Error checking product:', error);
        }
        }
    };
    return (
    <>
    <button onClick={handleCheckProducts}>Check Products</button>
    <SpreadsheetComponent 
        openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' 
        saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' 
        ref={(ssObj) => { spreadsheet = ssObj; }} 
        created={onCreated.bind(this)}
        height="500px"
        >
        <SheetsDirective>
            <SheetDirective name="Input Report">
                <RangesDirective>
                    <RangeDirective></RangeDirective>
                </RangesDirective>
                <RowsDirective>
                    <RowDirective index={0}>                          
                        <CellsDirective>
                        <CellDirective value="Barcode"></CellDirective>
                        <CellDirective value="Product name"></CellDirective>
                        <CellDirective value="Status"></CellDirective>
                        </CellsDirective>
                    </RowDirective>
                </RowsDirective>
                <ColumnsDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                </ColumnsDirective>
            </SheetDirective>
        </SheetsDirective>
    </SpreadsheetComponent>
    </>
    )
}

export default ProductGroupAddProducts