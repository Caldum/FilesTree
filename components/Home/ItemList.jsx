import React from 'react';
import { View } from 'react-native';
import Item from './Item';

export default function ItemList ({ items, padding = 0 }) {
  return (
    <View style={{ paddingLeft: padding }}>
      {items.map(data => (
        <Item key={data.name} item={data} padding={padding} ItemList={ItemList} />
      ))}
    </View>
  );
}
