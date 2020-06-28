import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  FlatList,
  Switch,
} from 'react-native';

import Item from './Item';

const bearerToken =
  'Bearer BQDCSFjTdo3hkezZ-aharpY82cJOOdoayrAbp5TgzOC80r5MdOKNCVHAE12c1Uu1fyxLU7m1glnNTVMHNogQK9xc818kXEvtkY2LeQGk3wxPrrW2kgknhMSP-tKJl6cxvFVZBn6SyiQZYveDdq9pQ04lvb59FckZ3FNFvMR8xWToxIyuo7yvunh5avW83TP8tNxUXSEKIaWwtlL9vmDXY1REV_Eb2p7zYWgYdk9mn1xnqw';

export default function Main(props) {
  const [searchString, setSearchString] = useState('Metal');
  const [limit, setLimit] = useState('5');
  const [data, setData] = useState([]);
  const [isAlbumsShown, setAlbumShown] = useState(false);

  const onChangeText = val => {
    setSearchString(val);
  };

  const onChangeLimit = val => {
    setLimit(val);
  };

  const onChangeSwitch = val => {
    setAlbumShown(val);
  };

  const onPressSearch = async () => {
    const result = await getData();

    setData(result);
  };

  const onPressClear = () => {
    setData([]);
    setSearchString('');
  };

  const onGoDetail = item => {
    if (item.type === 'artist') {
      props.onGoDetail(item);
    } else {
      Alert.alert('Sorry, details is not available for albums');
    }
  };

  useEffect(() => {
    onPressSearch(searchString);
  }, []);

  const getData = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?type=album,artist&limit=${limit}&q=${searchString}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: bearerToken,
        },
      },
    );
    const resJson = await res.json();

    // error handler
    const error = resJson.error;
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!error) {
      const {status, message} = error;
      Alert.alert(
        `error code: ${JSON.stringify(status)}`,
        JSON.stringify(message),
      );
      return data;
    }

    const artist = resJson.artists.items;
    const albums = isAlbumsShown ? resJson.albums.items : [];
    return [...albums, ...artist];
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Awesome inc.</Text>
      </View>

      <View style={styles.searchView}>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => onChangeText(text)}
          placeholder={'please type something for search...'}
          value={searchString}
        />
        <TextInput
          style={styles.limitInput}
          onChangeText={text => onChangeLimit(text)}
          placeholder={'limit'}
          value={limit}
        />
        <TouchableOpacity onPress={onPressSearch} style={styles.searchButton}>
          <Image
            style={{width: 30, height: 30}}
            source={{uri: 'https://img.icons8.com/color/2x/search.png'}}
          />
        </TouchableOpacity>
        <Button title="🔪" onPress={onPressClear} color="black" />
      </View>
      <View style={styles.searchView}>
        <Text>Show album(without details)</Text>
        <Switch
          value={isAlbumsShown}
          onValueChange={val => onChangeSwitch(val)}
        />
      </View>

      <FlatList
        data={data}
        renderItem={({item}) => (
          <Item
            id={item.id}
            images={item.images}
            name={item.name}
            type={item.type}
            onGoDetail={() => onGoDetail(item)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#ecf0f1',
  },
  containerSafe: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    marginBottom: 10,
  },
  searchView: {
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    flex: 10,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  limitInput: {
    height: 40,
    flex: 2,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
