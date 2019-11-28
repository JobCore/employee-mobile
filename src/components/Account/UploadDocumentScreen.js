import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Item, Text, Form, Label, Content, Container } from 'native-base';
import UploadDocumentStyle from './UploadDocumentStyle';
import { I18n } from 'react-i18next';
import { Loading } from '../../shared/components';
import { ModalHeader } from '../../shared/components/ModalHeader';
import { ADD_DOCUMENT_ROUTE } from '../../constants/routes';
class UploadDocumentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  goToAddDocument = () => {
    this.props.navigation.navigate(ADD_DOCUMENT_ROUTE);
  };

  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            <ModalHeader
              screenName={t('EDIT_PROFILE.myDocuments')}
              title={t('EDIT_PROFILE.myDocuments')}
            />
            {this.state.isLoading ? <Loading /> : null}
            <Content>
              <View style={UploadDocumentStyle.container}>
                <View>
                  <Form>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                    <View style={UploadDocumentStyle.formStyle}>
                      <Item
                        style={UploadDocumentStyle.viewInput}
                        inlineLabel
                        rounded>
                        <Label>#TitleDocument</Label>
                        <Label style={UploadDocumentStyle.statusStyle}>
                          #status
                        </Label>
                      </Item>
                      <Image
                        style={UploadDocumentStyle.garbageIcon}
                        source={require('../../assets/image/garbage.png')}
                      />
                    </View>
                  </Form>
                  <TouchableOpacity onPress={this.goToAddDocument}>
                    <View
                      full
                      // onPress={this.goToAddDocument}
                      style={UploadDocumentStyle.viewButtomLogin}>
                      <Text style={UploadDocumentStyle.textButtom}>
                        {t('EDIT_PROFILE.addDocument')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

export default UploadDocumentScreen;
