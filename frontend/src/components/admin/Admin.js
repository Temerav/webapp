import { useState, useEffect } from 'react';
import React from 'react';
import ItemCrud from '../item/ItemCrud';
import api from '../../api/axiosConfig';

const Admin = () => {

  const [items, setItems] = useState([]);

  // manage side effects
  useEffect(() => {
    (async () => await load())();
  }, []);

  async function load() {
    const result = await api.get("");
    setItems(result.data);
  }

  return (
    <div>
      <h1 className="text-center">List Of Items</h1>
      <ItemCrud load={load} items={items} />
    </div>
  );
};

export default Admin;