import React, { useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';

export default function Item({ item, ItemList }) {
  const [fileVisible, setFileVisibility] = useState(false);
  const hasFiles = !!item.files;

  return (
    <>
      <ListItem key={item.name} onPress={e => setFileVisibility(!fileVisible)} containerStyle={{ backgroundColor: '#3e6a80' }}>
        <Icon name="folder" color="#fab469" />
        <ListItem.Content>
          <ListItem.Title style={{ color: 'white' }}>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {hasFiles && fileVisible &&
        <ItemList items={item.files} />
      }
    </>
  );
}
