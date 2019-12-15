import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import {
  Item,
  Text,
  Form,
  Label,
  Content,
  Container,
  Icon,
  Picker,
} from 'native-base';
import UploadDocumentStyle from './UploadDocumentStyle';
import { I18n } from 'react-i18next';
import { Loading, CustomToast } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { ADD_DOCUMENT_ROUTE } from '../../constants/routes';
import accountStore from './AccountStore';
import {
  uploadDocument,
  getDocuments,
  getUser,
  deleteDocument,
} from './actions';
// import DocumentPicker from 'react-native-document-picker';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';
import ImagePicker from 'react-native-image-picker';
import documentsTypes from './documents-types-model';

const IMAGE_PICKER_OPTIONS = {
  mediaType: 'photo',
  noData: true,
  skipBackup: true,
};

class UploadDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showWarning: true,
      isLoading: true,
      documents: [],
      user: accountStore.getState('Login').user,
      docType: '',
    };
  }

  componentDidMount() {
    this.uploadDocumentSubscription = accountStore.subscribe(
      'UploadDocument',
      (data) => {
        console.log('UploadDocument: ', data);
        this.setState({ isLoading: false });
        getDocuments();
      },
    );
    this.getDocumentsSubscription = accountStore.subscribe(
      'GetDocuments',
      (documents) => {
        this.setState({ documents, isLoading: false });
        console.log('GetDocuments: ', documents);
      },
    );
    this.deleteDocumentsSubscription = accountStore.subscribe(
      'DeleteDocument',
      (res) => {
        getDocuments();
        this.setState({ isLoading: false });
        console.log('delete document: ', res);
      },
    );
    this.getUserSubscription = accountStore.subscribe('getUser', (user) => {
      this.setState({ user });
    });
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );
    getDocuments();
    getUser();
  }

  componentWillUnmount() {
    this.getDocumentsSubscription.unsubscribe();
    this.deleteDocumentsSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
    this.getUserSubscription.unsubscribe();
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false });
    CustomToast(err, 'danger');
  };

  goToAddDocument = () => {
    this.props.navigation.navigate(ADD_DOCUMENT_ROUTE);
  };

  // pickDocument = async () => {
  //   // Pick a single file
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf],
  //     });
  //     console.log(res);
  //     console.log(
  //       res.uri,
  //       res.type, // mime type
  //       res.name,
  //       res.size,
  //     );
  //     this.saveDocumentAlert(res.name, res);
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

  saveDocumentAlert = (docName, res) => {
    Alert.alert(
      i18next.t('USER_DOCUMENTS.wantToAddDocument'),
      ` ${docName}?`,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel add document');
          },
        },
        {
          text: i18next.t('USER_DOCUMENTS.saveDoc'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              uploadDocument(res);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  deleteDocumentAlert = (doc) => {
    Alert.alert(
      i18next.t('USER_DOCUMENTS.wantToDeleteDocument'),
      ` ${doc.name || `document #${doc.id}`}?`,
      [
        {
          text: i18next.t('APP.cancel'),
          onPress: () => {
            LOG(this, 'Cancel delete document');
          },
        },
        {
          text: i18next.t('USER_DOCUMENTS.deleteDoc'),
          onPress: () => {
            this.setState({ isLoading: true }, () => {
              deleteDocument(doc);
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  camelCaseIt = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  openImagePicker = () => {
    ImagePicker.showImagePicker(
      IMAGE_PICKER_OPTIONS,
      this.handleImagePickerResponse,
    );
  };

  /**
   * Handle react-native-image-picker response and set the selected image
   * @param  {object} response A react-native-image-picker response
   * with the uri, type & name
   */
  handleImagePickerResponse = (response) => {
    const { docType } = this.state;
    if (response.didCancel) {
      // for react-native-image-picker response
      LOG(this, 'User cancelled image picker');
    } else if (response.error) {
      // for react-native-image-picker response
      LOG(this, `ImagePicker Error: ${response.error}`);
    } else if (response.customButton) {
      // for react-native-image-picker response
      LOG(this, `User tapped custom button: ${response.customButton}`);
    } else {
      if (!response.uri) return;

      let type = response.type;

      if (type === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('.');
        type = response.uri.substring(pos + 1);
        if (type) type = `image/${type}`;
      }
      if (type === undefined) {
        const splitted = response.fileName.split('.');
        type = splitted[splitted.length - 1];
        if (type) type = `image/${type}`;
      }

      let name = response.fileName;
      if (name === undefined && response.fileName === undefined) {
        const pos = response.uri.lastIndexOf('/');
        name = response.uri.substring(pos + 1);
      }

      const selectedImage = {
        uri: response.uri,
        type: type.toLowerCase(),
        name,
        docType,
      };
      this.saveDocumentAlert(selectedImage.name, selectedImage);
      this.setState({ selectedImage });
    }
  };

  render() {
    const { user, showWarning, docType } = this.state;
    const { documents } = this.state;
    console.log('user: ', user);
    console.log('docType: ', docType);
    const isAllowDocuments = user.employee
      ? user.employee.document_active
      : true;
    // const isAllowDocuments = true;
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('USER_DOCUMENTS.myDocuments')}
              title={t('USER_DOCUMENTS.myDocuments')}
            />
            {showWarning ? (
              <View
                style={
                  isAllowDocuments
                    ? UploadDocumentStyle.userStatusLabelApproved
                    : UploadDocumentStyle.userStatusLabelRejected
                }>
                <Text
                  style={
                    isAllowDocuments
                      ? UploadDocumentStyle.userStatusLabelTextApproved
                      : UploadDocumentStyle.userStatusLabelTextRejected
                  }>
                  {`${
                    user.user ? user.user.first_name : t('USER_DOCUMENTS.user')
                  } ${
                    isAllowDocuments
                      ? t('USER_DOCUMENTS.allowDocuments')
                      : t('USER_DOCUMENTS.notAllowDocuments')
                  }`}
                </Text>
                <Icon
                  onPress={() => this.setState({ showWarning: false })}
                  style={
                    isAllowDocuments
                      ? UploadDocumentStyle.closeIconApproved
                      : UploadDocumentStyle.closeIconRejected
                  }
                  name="close"
                  size={5}
                />
              </View>
            ) : null}
            {this.state.isLoading ? <Loading /> : null}
            <Content>
              <View style={UploadDocumentStyle.container}>
                <View style={{ height: '100%' }}>
                  {documents.length > 0 ? (
                    documents.map((doc, i) => (
                      <Form key={i}>
                        <View style={UploadDocumentStyle.formStyle}>
                          <Item
                            style={UploadDocumentStyle.viewInput}
                            inlineLabel
                            rounded>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Label numberOfLines={1} style={{ width: 180 }}>
                                {doc.name || `document #${doc.id}`}
                              </Label>
                              <Label style={UploadDocumentStyle.statusStyle}>
                                {doc.state
                                  ? this.camelCaseIt(doc.state)
                                  : 'Pending'}
                              </Label>
                            </View>
                            {doc.rejected_reason ? (
                              <View>
                                <Label
                                  numberOfLines={1}
                                  style={
                                    UploadDocumentStyle.documentRejectedText
                                  }>
                                  {`${t('USER_DOCUMENTS.rejectedReason')} ${
                                    doc.rejected_reason
                                  }`}
                                </Label>
                              </View>
                            ) : null}
                          </Item>
                          {doc.state !== 'APPROVED' ? (
                            <TouchableOpacity
                              onPress={() => this.deleteDocumentAlert(doc)}>
                              <Image
                                style={UploadDocumentStyle.garbageIcon}
                                source={require('../../assets/image/delete.png')}
                              />
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </Form>
                    ))
                  ) : (
                    <Text style={UploadDocumentStyle.noDocsText}>
                      {t('USER_DOCUMENTS.noDocuments')}
                    </Text>
                  )}
                </View>
              </View>
            </Content>
            <View style={UploadDocumentStyle.buttonContainer}>
              <Picker
                mode="dropdown"
                enabled={isAllowDocuments}
                // iosIcon={
                //   <Icon
                //     style={{ marginLeft: 0 }}
                //     name="arrow-down"
                //   />
                // }
                style={UploadDocumentStyle.viewButtomLogin}
                placeholder={t('USER_DOCUMENTS.addDocument')}
                placeholderStyle={
                  UploadDocumentStyle.placeholderTextButtomPicker
                }
                selectedValue={''}
                onValueChange={(text) =>
                  this.setState({ docType: text }, () => {
                    setTimeout(() => {
                      this.openImagePicker();
                    }, 1000);
                  })
                }>
                {documentsTypes.map((type, i) => (
                  <Picker.Item key={i} label={type.name} value={type.value} />
                ))}
              </Picker>
            </View>
          </Container>
        )}
      </I18n>
    );
  }
}

export default UploadDocumentScreen;
