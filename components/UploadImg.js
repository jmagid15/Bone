import React, {Component} from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import Modal from 'react-native-modal';
import {Button as RNButton} from 'react-native-elements';
import firebase from 'firebase';
//import {firebase as RNFirebase} from 'react-native-firebase';
import b64 from 'base64-js';

export default class UploadImg extends Component {
  state = {
    image: null,
    uploading: false,
    visibleModal: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15,
          }}>
          Example: Upload ImagePicker result
        </Text>

        <RNButton
          onPress = {() => this.setState({ visibleModal: 1 })}
          title = "Change profile picture"
          backgroundColor = 'blue'
          containerViewStyle = {styles.button}/>

        <Modal
          isVisible = {this.state.visibleModal === 1}
          style = {styles.bottomModal}
          onBackdropPress = {() => this.setState({visibleModal: null})}>
          <View style={styles.modalContent}>
            <RNButton
              onPress = {this._pickImage}
              title = "Camera Roll"
              backgroundColor = 'lightblue'
              containerViewStyle = {styles.button}/>
            <RNButton
              onPress = {this._takePhoto}
              title = "Take Photo"
              backgroundColor = 'lightblue'
              containerViewStyle = {styles.button}/>
            <RNButton
              onPress = {() => this.setState({ visibleModal: null})}
              title = "Close"
              backgroundColor = 'lightblue'
              containerViewStyle = {styles.button}/>
          </View>
        </Modal>

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    console.log('Image chosen. Details:');
    console.log(pickerResult);

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log('Image chosen. Details:');
    console.log(pickerResult);

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult);
        console.log('UploadResponse:')
        console.log(uploadResponse)
        // uploadResult = await uploadResponse.json();
        // console.log('UploadResult:')
        // console.log(uploadResult)
        // this.setState({ image: uploadResult.location });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(pickerResult) {
  // let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
  //
  // // Note:
  // // Uncomment this if you want to experiment with local server
  // //
  // // if (Constants.isDevice) {
  // //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // // } else {
  // //   apiUrl = `http://localhost:3000/upload`
  // // }
  //
  // let uriParts = uri.split('.');
  // let fileType = uri[uri.length - 1];
  //
  // let formData = new FormData();
  // formData.append('photo', {
  //   uri,
  //   name: `photo.${fileType}`,
  //   type: `image/${fileType}`,
  // });
  //
  // let options = {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   },
  // };
  //
  // return fetch(apiUrl, options);
  console.log('uploading IMG!!!!!!')
  // const result = await ImagePicker.launchCameraAsync({
  //       base64: true
  // })

  //Concat the image type to the base64 data
  let message = 'data:image/jpg;base64, '+ pickerResult.base64;

  const byteArray = b64.toByteArray(pickerResult.base64)
  console.log('Converted to byteArray.')
  const metadata = {contentType: 'image/jpg'};
  firebase.storage()
    .ref()
    .child('images/my_pic.jpg')
    .putString(message, "raw", metadata)
    .then((snapshot) => {
      console.log("uploaded image!")
    })
  console.log('Firebase upload cmd ran')
  return true
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    padding: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    //padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 10,
  },
});
