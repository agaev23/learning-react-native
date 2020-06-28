import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';

import {Linking} from 'react-native';

const back =
  'https://img.favpng.com/19/13/6/logo-organization-photography-brand-png-favpng-NdpBCztQKB1TvXknxeySryMsk.jpg';

export default function Detail(props) {
  const {
    onGoMain,
    onGoModal,
    type,
    name,
    thumbnail,
    genres,
    popularity,
    followers,
    url,
  } = props;

  return (
    <View style={styles.detailContainer}>
      <TouchableOpacity onPress={onGoMain} style={styles.backButton}>
        <Image style={{width: 40, height: 40}} source={{uri: back}} />
      </TouchableOpacity>

      <Text style={styles.detailItem}>type: {type}</Text>
      <View style={styles.detailImageContainer}>
        <Text style={styles.detailItemTitle}>name: {name}</Text>
        <Image style={{width: 300, height: 300}} source={{uri: thumbnail}} />
      </View>
      <Text style={styles.detailItem}>Genres: {genres}</Text>
      <Text style={styles.detailItem}>Popularity: {popularity}</Text>
      <Text style={styles.detailItem}>Followers: {followers}</Text>

      <Button
        title={`open "${name}"`}
        onPress={() => Linking.openURL(url)}
        style={styles.button}
      />

      <Button
        title={`share qr code for "${name}"`}
        onPress={onGoModal}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
