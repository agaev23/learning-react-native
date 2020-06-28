import * as React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes';

export default function Share(props) {
  const { url, thumbnail, name, back, onGoDetail } = props;

  return (
    <View style={styles.detailContainer}>
      <TouchableOpacity onPress={onGoDetail} style={styles.backButton}>
        <Image style={{width: 40, height: 40}} source={{uri: back}} />
      </TouchableOpacity>

      <View style={styles.detailImageContainer}>
        <Text style={styles.detailItemTitle}>{name}</Text>
        <QRCode content={url} logo={{uri: thumbnail}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  backButton: {
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    height: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailItem: {
    fontSize: 18,
    paddingVertical: 5,
    paddingLeft: 10,
  },
});
