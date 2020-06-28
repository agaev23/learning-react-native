import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function Item(props) {
  const {images, name, type, onGoDetail} = props;
  const thumbnail = (images && images[0] && images[0].url) || noPhoto;
  const noPhoto = 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG';

  return (
    <TouchableOpacity onPress={onGoDetail} style={styles.item}>
      <View>
        <Image style={{width: 70, height: 70}} source={{uri: thumbnail}} />
      </View>
      <View style={styles.itemDescription}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemType}>type: {type}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    marginVertical: 2,
  },
  itemDescription: {
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemType: {
    fontSize: 14,
  },
});
