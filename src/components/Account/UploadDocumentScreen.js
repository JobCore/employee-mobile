import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { Item, Text, Form, Label, Content, Container, Icon } from 'native-base';
import UploadDocumentStyle from './UploadDocumentStyle';
import { I18n } from 'react-i18next';
import { Loading, CustomToast } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { ADD_DOCUMENT_ROUTE } from '../../constants/routes';
import accountStore from './AccountStore';
import { uploadDocument, getDocuments } from './actions';
import DocumentPicker from 'react-native-document-picker';
import { i18next } from '../../i18n';
import { LOG } from '../../shared';

class UploadDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showWarning: true,
      isAllowDocuments: true,
      documents: [],
      user: accountStore.getState('Login').user,
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
        this.setState({ documents });
        console.log('GetDocuments: ', documents);
      },
    );
    this.accountStoreError = accountStore.subscribe(
      'AccountStoreError',
      this.errorHandler,
    );
    getDocuments();
  }

  componentWillUnmount() {
    this.getDocumentsSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  errorHandler = (err) => {
    this.setState({ isLoading: false });
    CustomToast(err, 'danger');
  };

  goToAddDocument = () => {
    this.props.navigation.navigate(ADD_DOCUMENT_ROUTE);
  };

  pickDocument = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      this.saveDocumentAlert(res.name, res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

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

  deleteDocumentAlert = (docName) => {
    Alert.alert(
      i18next.t('USER_DOCUMENTS.wantToDeleteDocument'),
      ` ${docName}?`,
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
            // this.setState({ isLoading: true }, () => {
            //   deleteDocument(res);
            // });
          },
        },
      ],
      { cancelable: false },
    );
  };

  camelCaseIt = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  render() {
    const { user, isAllowDocuments, showWarning } = this.state;
    const { documents } = this.state;
    console.log('user: ', user);
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
                  {`${user.first_name} ${
                    isAllowDocuments
                      ? t('USER_DOCUMENTS.allowDocuments')
                      : t('USER_DOCUMENTS.notAllowDocuments')
                  }`}
                </Text>
                {isAllowDocuments ? (
                  <Icon
                    onPress={() => this.setState({ showWarning: false })}
                    style={UploadDocumentStyle.closeIconApproved}
                    name="close"
                    size={5}
                  />
                ) : null}
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
                            <Label style={{ width: 180 }}>
                              {doc.name || `document #${doc.id}`}
                            </Label>
                            <Label style={UploadDocumentStyle.statusStyle}>
                              {doc.state
                                ? this.camelCaseIt(doc.state)
                                : 'Pending'}
                            </Label>
                          </Item>
                          <TouchableOpacity
                            onPress={() =>
                              this.deleteDocumentAlert(
                                doc.name || `document #${doc.id}`,
                              )
                            }>
                            <Image
                              style={UploadDocumentStyle.garbageIcon}
                              source={require('../../assets/image/delete.png')}
                            />
                          </TouchableOpacity>
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
              <TouchableOpacity onPress={() => this.pickDocument()}>
                <View full style={UploadDocumentStyle.viewButtomLogin}>
                  <Text style={UploadDocumentStyle.textButtom}>
                    {t('USER_DOCUMENTS.addDocument')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Container>
        )}
      </I18n>
    );
  }
}

export default UploadDocumentScreen;
