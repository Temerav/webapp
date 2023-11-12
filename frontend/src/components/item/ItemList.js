import React from "react";

const ItemList = ({ items, editItem, deleteItem }) => {
  return (
    <table className="table table-hover mt-3" align="center">
      <thead className="thead-light">
        <tr>
          <th scope="col">Item Id</th>
          <th scope="col">Item Name</th>
          <th scope="col">Item Cost</th>
          <th scope="col">Item Details</th>
          <th scope="col">Item Picture Path</th>

          <th scope="col">Option</th>
        </tr>
      </thead>
      {items.map((item, index) => {
        return (
          <tbody key={item.id}>
            <tr>
              <th scope="row">{index + 1} </th>
              <td>{item.itemName}</td>
              <td>{item.itemCost}</td>
              <td>{item.itemDetails}</td>
              <td>{item.picturePath}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => editItem(item)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default ItemList;