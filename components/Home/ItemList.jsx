import React from 'react';
import Item from './Item';

export default function ItemList ({ items }) {
  return (
    items.map(data => (
      <Item key={data.name} item={data} ItemList={ItemList} />
    ))
  );
}
