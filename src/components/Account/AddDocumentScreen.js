import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Item,
  Button,
  Text,
  Form,
  Label,
  Content,
  Container,
} from 'native-base';
import UploadDocumentStyle from './UploadDocumentStyle';
import { I18n } from 'react-i18next';
import { Loading } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import DocumentPicker from 'react-native-document-picker';
import accountStore from './AccountStore';
import { uploadDocument, getDocuments } from './actions';

class AddDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount() {
    this.uploadDocumentSubscription = accountStore.subscribe(
      'UploadDocument',
      (data) => {
        console.log('UploadDocument: ', data);
      },
    );
    this.getDocumentsSubscription = accountStore.subscribe(
      'GetDocuments',
      (documents) => {
        console.log('GetDocuments: ', documents);
      },
    );
    getDocuments();
  }

  componentWillUnmount() {
    // this.uploadDocumentSubscription.unsubscribe();
    this.getDocumentsSubscription.unsubscribe();
  }

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
      uploadDocument(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('EDIT_PROFILE.addDocumentsTitle')}
              title={t('EDIT_PROFILE.addDocumentsTitle')}
            />
            {this.state.isLoading ? <Loading /> : null}
            <Content>
              <View style={UploadDocumentStyle.container}>
                <View>
                  <Form>
                    <Item
                      style={UploadDocumentStyle.viewInput}
                      inlineLabel
                      rounded>
                      <Label>TitleDocument</Label>
                    </Item>
                  </Form>
                  <Button
                    full
                    onPress={() => this.pickDocument()}
                    style={UploadDocumentStyle.viewButtomLogin}>
                    <Text style={UploadDocumentStyle.textButtom}>
                      {t('EDIT_PROFILE.loadDocument')}
                    </Text>
                  </Button>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}
export default AddDocumentScreen;
