import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialRows = [
  { id: '1', orderId: '121091', date: 'Aug 1, 2019', customer: 'A', fulfillment: 'Unfulfilled', total: '$604.50', profit: '$182.50', status: 'Authorized', updated: 'Today' },
  { id: '2', orderId: '121092', date: 'Aug 1, 2019', customer: 'B', fulfillment: 'Unfulfilled', total: '$604.50', profit: '$182.50', status: 'Authorized', updated: 'Today' },
  { id: '3', orderId: '121093', date: 'Aug 1, 2019', customer: 'C', fulfillment: 'Unfulfilled', total: '$604.50', profit: '$182.50', status: 'Authorized', updated: 'Today' },
  { id: '4', orderId: '121094', date: 'Aug 1, 2019', customer: 'D', fulfillment: 'Unfulfilled', total: '$604.50', profit: '$182.50', status: 'Authorized', updated: 'Today' },
  // Add more rows as needed
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function Test2Page() {
  const [rows, setRows] = useState(initialRows);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newRows = reorder(
      rows,
      result.source.index,
      result.destination.index
    );

    setRows(newRows);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-table">
        {(provided) => (
          <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fulfillment</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided) => (
                      <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="hover:bg-gray-100">
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.orderId}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.date}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.customer}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap">{row.fulfillment}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.total}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.profit}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap">{row.status}</td>
                        <td className="min-w-[100px] px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.updated}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Test2Page;
