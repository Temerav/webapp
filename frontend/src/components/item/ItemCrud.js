import React from 'react'
import { useState } from 'react';
import api from '../../api/axiosConfig';
import ItemList from './ItemList';

const ItemCrud = ({ load, items}) => {

  // state definition
  const [id, setId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [picturePath, setPicturePath] = useState("");

  // handlers
  async function save(event) {
    event.preventDefault();
    await api.post("", {
      itemName: itemName,
      itemCost: itemCost,
      itemDetails: itemDetails,
      picturePath: picturePath,
    });
    alert("Item Record Saved");
    // reset
    setId("");
    setItemName("");
    setItemCost("");
    setItemDetails("");
    setPicturePath("");
    load();
  }

  async function editItem(item) {
    setId(item.id);
    setItemName(item.itemName);
    setItemCost(item.itemCost);
    setItemDetails(item.itemDetails);
    setPicturePath(item.picturePath);
  }

  async function deleteItem(id) {
    await api.delete("" + id);
    alert("Item Details Deleted!");
    load();
  }

  async function update(event) {
    event.preventDefault();
    if (!id) return alert("Item Not Found");
    await api.put("" + id, {
      id: id,
      itemName: itemName,
      itemCost: itemCost,
      itemDetails: itemDetails,
      picturePath: picturePath,
    });
    alert("Item Details Updated");
    // reset
    setId("");
    setItemName("");
    setItemCost("");
    setItemDetails("");
    setPicturePath("");
    load();
  }

  // jsx
  return (
    <div className="container mt-4">
      <form>
        <div className="form-group my-2">
          <input
            type="text"
            className="form-control"
            hidden
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
        </div>

        <div className="form-group mb-2">
          <label>Item Cost</label>
          <input
            type="text"
            className="form-control"
            value={itemCost}
            onChange={e => setItemCost(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-4">
            <label>Item Details</label>
            <input
              type="text"
              className="form-control"
              value={itemDetails}
              onChange={e => setItemDetails(e.target.value)}
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-4'>
            <label>Picture Path</label>
            <input
              type="text"
              className="form-control"
              value={picturePath}
              onChange={e => setPicturePath(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button className="btn btn-primary m-4" onClick={save}>
            Register
          </button>
          <button className="btn btn-warning m-4" onClick={update}>
            Update
          </button>
        </div>
      </form>
      <ItemList
        items={items}
        editItem={editItem}
        deleteItem={deleteItem}
      />
    </div>
  );
};

export default ItemCrud;
