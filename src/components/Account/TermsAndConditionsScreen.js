import React from 'react';
import { Container, Content } from 'native-base';
import { I18n } from 'react-i18next';
import { TabHeader } from '../../shared/components/TabHeader';

const TermsAndConditionsScreen = () => {
  return (
    <I18n>
      {(t) => (
        <Container>
          <TabHeader title={t('TERMS_AND_CONDITIONS.title')} />
          <Content />
        </Container>
      )}
    </I18n>
  );
};

export default TermsAndConditionsScreen;
