import React, { Component } from 'react';
import { Content, Container, Button, Text } from 'native-base';
import { I18n } from 'react-i18next';
import { REGISTER_ROUTE } from '../../constants/routes';
import { TabHeader } from '../../shared/components/TabHeader';
import styles from './TermsAndConditionsStyle';
import * as actions from './actions';
import store from './AccountStore';

class TermsAndConditionsScreen extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.editTermsAndConditionsSubscription = store.subscribe(
      'TermsAndCondition',
      (bool) => {
        console.log('terms changed: ', bool);
        this.props.navigation.navigate(REGISTER_ROUTE);
      },
    );
  }

  componentWillUnmount() {
    this.editTermsAndConditionsSubscription.unsubscribe();
  }

  updateTermsAndCondition = (boolean) => {
    actions.editTermsAndCondition(boolean);
  };

  bulletedText = (text) => `${'\u2022'} ${text}${'\n'}`;
  render() {
    return (
      <I18n>
        {(t) => (
          <Container>
            <TabHeader
              goBack
              onPressBack={() => this.updateTermsAndCondition(false)}
              title={t('TERMS_AND_CONDITIONS.title')}
            />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
              <Text style={styles.termsText}>Welcome to JobCore!</Text>
              <Text style={styles.termsText}>
                These terms and conditions outline the rules and regulations for
                the use of JobCore LLC{`'`}s Website, located at www.jobcore.co.
              </Text>
              <Text style={styles.termsText}>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use JobCore if you do not agree
                to take all of the terms and conditions stated on this page. Our
                Terms and Conditions were created with the help of the Terms And
                Conditions Generator.
              </Text>
              <Text style={styles.termsText}>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                {`"`}Client{`"`}, {`"`}You{`"`} and {`"`}Your{`"`} refers to
                you, the person log on this website and compliant to the
                Company’s terms and conditions.
                {`"`}The Company{`"`}, {`"`}Ourselves{`"`}, {`"`}We{`"`}, {`"`}
                Our{`"`} and {`"`}Us{`"`}, refers to our Company. {`"`}Party
                {`"`}, {`"`}Parties{`"`}, or {`"`}Us{`"`}, refers to both the
                Client and ourselves. All terms refer to the offer, acceptance
                and consideration of payment necessary to undertake the process
                of our assistance to the Client in the most appropriate manner
                for the express purpose of meeting the Client’s needs in respect
                of provision of the Company’s stated services, in accordance
                with and subject to, prevailing law of Netherlands. Any use of
                the above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </Text>
              <Text style={styles.termsTitleText}>Cookies</Text>
              <Text style={styles.termsText}>
                We employ the use of cookies. By accessing JobCore, you agreed
                to use cookies in agreement with the JobCore LLC{`'`}s Privacy
                Policy.
              </Text>
              <Text style={styles.termsText}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </Text>
              <Text style={styles.termsTitleText}>License</Text>
              <Text style={styles.termsText}>
                Unless otherwise stated, JobCore LLC and/or its licensors own
                the intellectual property rights for all material on JobCore.
                All intellectual property rights are reserved. You may access
                this from JobCore for your own personal use subjected to
                restrictions set in these terms and conditions.
              </Text>
              <Text style={styles.termsText}>You must not:</Text>
              <Text style={styles.termsText}>
                {this.bulletedText('Republish material from JobCore.')}
                {this.bulletedText(
                  'Sell, rent or sub-license material from JobCore.',
                )}
                {this.bulletedText(
                  'Reproduce, duplicate or copy material from JobCore.',
                )}
                {this.bulletedText('Redistribute content from JobCore.')}
              </Text>
              <Text style={styles.termsText}>
                This Agreement shall begin on the date hereof.
              </Text>
              <Text style={styles.termsText}>
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. JobCore LLC does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do not
                reflect the views and opinions of JobCore LLC,its agents and/or
                affiliates. Comments reflect the views and opinions of the
                person who post their views and opinions. To the extent
                permitted by applicable laws, JobCore LLC shall not be liable
                for the Comments or for any liability, damages or expenses
                caused and/or suffered as a result of any use of and/or posting
                of and/or appearance of the Comments on this website.
              </Text>
              <Text style={styles.termsText}>
                JobCore LLC reserves the right to monitor all Comments and to
                remove any Comments which can be considered inappropriate,
                offensive or causes breach of these Terms and Conditions.
              </Text>
              <Text style={styles.termsText}>
                You warrant and represent that:
              </Text>
              <Text style={styles.termsText}>
                {this.bulletedText(
                  'You are entitled to post the Comments on our website and have all necessary licenses and consents to do so.',
                )}
                {this.bulletedText(
                  'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party.',
                )}
                {this.bulletedText(
                  'The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy.',
                )}
                {this.bulletedText(
                  'The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.',
                )}
              </Text>
              <Text style={styles.termsText}>
                You hereby grant JobCore LLC a non-exclusive license to use,
                reproduce, edit and authorize others to use, reproduce and edit
                any of your Comments in any and all forms, formats or media.
              </Text>
              <Text style={styles.termsTitleText}>
                Hyperlinking to our Content
              </Text>
              <Text style={styles.termsText}>
                The following organizations may link to our Website without
                prior written approval:
              </Text>
              <Text style={styles.termsText}>
                {this.bulletedText('Government agencies.')}
                {this.bulletedText('Search engines.')}
                {this.bulletedText('News organizations.')}
                {this.bulletedText(
                  'Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.',
                )}
                {this.bulletedText(
                  'System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.',
                )}
              </Text>
              <Text style={styles.termsText}>
                These organizations may link to our home page, to publications
                or to other Website information so long as the link: (a) is not
                in any way deceptive; (b) does not falsely imply sponsorship,
                endorsement or approval of the linking party and its products
                and/or services; and (c) fits within the context of the linking
                party’s site.
              </Text>
              <Text style={styles.termsText}>
                We may consider and approve other link requests from the
                following types of organizations:
              </Text>
              <Text style={styles.termsText}>
                {this.bulletedText(
                  'commonly-known consumer and/or business information sources',
                )}
                {this.bulletedText('dot.com community sites')}
                {this.bulletedText(
                  'associations or other groups representing charities',
                )}
                {this.bulletedText('online directory distributors')}
                {this.bulletedText('internet portals')}
                {this.bulletedText('accounting, law and consulting firms')}
                {this.bulletedText(
                  'educational institutions and trade associations',
                )}
              </Text>
              <Text style={styles.termsText}>
                We will approve link requests from these organizations if we
                decide that: (a) the link would not make us look unfavorably to
                ourselves or to our accredited businesses; (b) the organization
                does not have any negative records with us; (c) the benefit to
                us from the visibility of the hyperlink compensates the absence
                of JobCore LLC; and (d) the link is in the context of general
                resource information.
              </Text>
              <Text style={styles.termsText}>
                These organizations may link to our home page so long as the
                link: (a) is not in any way deceptive; (b) does not falsely
                imply sponsorship, endorsement or approval of the linking party
                and its products or services; and (c) fits within the context of
                the linking party’s site.
              </Text>
              <Text style={styles.termsText}>
                If you are one of the organizations listed in paragraph 2 above
                and are interested in linking to our website, you must inform us
                by sending an e-mail to JobCore LLC. Please include your name,
                your organization name, contact information as well as the URL
                of your site, a list of any URLs from which you intend to link
                to our Website, and a list of the URLs on our site to which you
                would like to link. Wait 2-3 weeks for a response.
              </Text>
              <Text style={styles.termsText}>
                Approved organizations may hyperlink to our Website as follows:
              </Text>
              <Text style={styles.termsText}>
                {this.bulletedText('By use of our corporate name.')}
                {this.bulletedText(
                  'By use of the uniform resource locator being linked to.',
                )}
                {this.bulletedText(
                  'By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.',
                )}
              </Text>
              <Text style={styles.termsText}>
                No use of JobCore LLC{`'`}s logo or other artwork will be
                allowed for linking absent a trademark license agreement.
              </Text>
              <Text style={styles.termsTitleText}>iFrames</Text>
              <Text style={styles.termsText}>
                Without prior approval and written permission, you may not
                create frames around our Webpages that alter in any way the
                visual presentation or appearance of our Website.
              </Text>
              <Text style={styles.termsTitleText}>Content Liability</Text>
              <Text style={styles.termsText}>
                We shall not be hold responsible for any content that appears on
                your Website. You agree to protect and defend us against all
                claims that is rising on your Website. No link(s) should appear
                on any Website that may be interpreted as libelous, obscene or
                criminal, or which infringes, otherwise violates, or advocates
                the infringement or other violation of, any third party rights.
              </Text>
              <Text style={styles.termsTitleText}>Your Privacy</Text>
              <Text style={styles.termsText}>Please read Privacy Policy</Text>
              <Text style={styles.termsTitleText}>Reservation of Rights</Text>
              <Text style={styles.termsText}>
                We reserve the right to request that you remove all links or any
                particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amen these terms and conditions and it’s linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </Text>
              <Text style={styles.termsTitleText}>
                Removal of links from our website
              </Text>
              <Text style={styles.termsText}>
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us any moment. We
                will consider requests to remove links but we are not obligated
                to or so or to respond to you directly.
              </Text>
              <Text style={styles.termsText}>
                We do not ensure that the information on this website is
                correct, we do not warrant its completeness or accuracy; nor do
                we promise to ensure that the website remains available or that
                the material on the website is kept up to date.
              </Text>
              <Text style={styles.termsTitleText}>Disclaimer</Text>
              <Text style={styles.termsText}>
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website. Nothing in this disclaimer
                will:
              </Text>
              <Text style={styles.termsText}>
                {this.bulletedText(
                  'limit or exclude our or your liability for death or personal injury',
                )}
                {this.bulletedText(
                  'limit or exclude our or your liability for fraud or fraudulent misrepresentation',
                )}
                {this.bulletedText(
                  'limit any of our or your liabilities in any way that is not permitted under applicable law',
                )}
                {this.bulletedText(
                  'exclude any of our or your liabilities that may not be excluded under applicable law',
                )}
              </Text>
              <Text style={styles.termsText}>
                The limitations and prohibitions of liability set in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty.
              </Text>
              <Text style={styles.termsText}>
                As long as the website and the information and services on the
                website are provided free of charge, we will not be liable for
                any loss or damage of any nature.
              </Text>
              <Button
                full
                onPress={() => this.updateTermsAndCondition(true)}
                style={styles.viewButtomLogin}>
                <Text style={styles.textButtom}>
                  {t('TERMS_AND_CONDITIONS.accept')}
                </Text>
              </Button>
              <Button
                full
                onPress={() => this.updateTermsAndCondition(false)}
                style={[styles.viewButtomLogin, { marginBottom: 30 }]}>
                <Text style={styles.textButtom}>
                  {t('TERMS_AND_CONDITIONS.reject')}
                </Text>
              </Button>
            </Content>
          </Container>
        )}
      </I18n>
    );
  }
}

export default TermsAndConditionsScreen;
