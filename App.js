import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import Share from './components/Share';
import Detail from './components/Detail';
import Main from './components/Main';

const back =
  'https://img.favpng.com/19/13/6/logo-organization-photography-brand-png-favpng-NdpBCztQKB1TvXknxeySryMsk.jpg';
const noPhoto = 'https://www.freeiconspng.com/uploads/no-image-icon-11.PNG';

const SCENES = {
  MAIN: 1,
  DETAIL: 2,
  MODAL: 3,
};

export default function App() {
  const [activeScene, setActiveScene] = useState(SCENES.MAIN);
  const [selectedItem, setSelectedItem] = useState(false);

  const onGoMain = () => {
    setActiveScene(SCENES.MAIN);
  };

  const onGoModal = () => {
    setActiveScene(SCENES.MODAL);
  };

  const onGoDetail = item => {
    setSelectedItem(item);
    setActiveScene(SCENES.DETAIL);
  };

  const url =
    (selectedItem &&
      selectedItem.external_urls &&
      selectedItem.external_urls.spotify) ||
    false;
  const followers =
    (selectedItem && selectedItem.followers && selectedItem.followers.total) ||
    0;
  const genres =
    (selectedItem && selectedItem.genres && selectedItem.genres.join(', ')) ||
    '';
  const thumbnail =
    (selectedItem &&
      selectedItem.images &&
      selectedItem.images[0] &&
      selectedItem.images[0].url) ||
    noPhoto;
  const name = (selectedItem && selectedItem.name) || '';
  const popularity = (selectedItem && selectedItem.popularity) || 0;
  const type = (selectedItem && selectedItem.type) || '';

  return (
    <SafeAreaView style={styles.containerSafe}>
      {activeScene === SCENES.MAIN && (
        <Main onGoDetail={item => onGoDetail(item)} />
      )}
      {activeScene === SCENES.DETAIL && (
        <Detail
          onGoMain={onGoMain}
          onGoModal={onGoModal}
          type={type}
          name={name}
          thumbnail={thumbnail}
          genres={genres}
          popularity={popularity}
          followers={followers}
          url={url}
        />
      )}
      {activeScene === SCENES.MODAL && (
        <Share
          url={url}
          thumbnail={thumbnail}
          name={name}
          back={back}
          onGoDetail={() => onGoDetail(selectedItem)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
  },
});
