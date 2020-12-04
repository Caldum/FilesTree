import React, { useState } from 'react';
import { ListItem, Icon } from 'react-native-elements';

export default function Item ({ item, ItemList }) {
  const [fileVisible, setFileVisibility] = useState(false);
  const hasFiles = !!item.files;

  return (
    <>
      <ListItem key={item.name} onPress={hasFiles && item.files.length > 0 ? () => setFileVisibility(!fileVisible) : null} containerStyle={{ backgroundColor: '#3e6a80' }}>
        {hasFiles && item.files.length > 0 && <Icon name={fileVisible ? 'expand-more' : 'chevron-right'} color="#fab469" />}
        <Icon name={item.type === 'directory' ? 'folder' : 'description'} color="#fab469" />
        <ListItem.Content>
          <ListItem.Title style={{ color: 'white' }}>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {hasFiles && fileVisible &&
        <ItemList items={item.files} padding={30} />
      }
    </>
  );
}
