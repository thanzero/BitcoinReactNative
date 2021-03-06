import React from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// 3rd party libraries
import { Actions } from 'react-native-router-flux';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import DeviceInfo from 'react-native-device-info';
import GoogleAnalytics from 'react-native-google-analytics-bridge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';
import ReactNativeI18n from 'react-native-i18n';

// Components
import AdmobCell from '../components/admob-cell';

import I18n from '../utils/i18n';

const deviceLocale = ReactNativeI18n.locale;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
  },
  navigatorBarIOS: {
    backgroundColor: '#455A64',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#37474F',
  },
  navigatorLeftButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  navigatorRightButton: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 10,
  },
  toolbar: {
    height: 56,
    backgroundColor: '#202020',
  },
});

export default class MoreView extends React.Component {
  onActionSelected(position) {
    if (position === 0) {  // index of 'Done'
      Actions.pop();
    }
  }

  renderToolbar() {
    if (Platform.OS === 'ios') {
      return (
        <NavigationBar
          statusBar={{ tintColor: '#455A64', style: 'light-content' }}
          style={styles.navigatorBarIOS}
          title={{ title: this.props.title, tintColor: 'white' }}
          rightButton={{
            title: I18n.t('done'),
            tintColor: '#3CABDA',
            handler: Actions.pop,
          }}
        />
      );
    } else if (Platform.OS === 'android') {
      return (
        <Icon.ToolbarAndroid
          navIconName="arrow-back"
          onIconClicked={Actions.pop}
          style={styles.toolbar}
          title={this.props.title}
          titleColor="white"
        />
      );
    }
  }

  render() {
    GoogleAnalytics.trackScreenView('settings');
    return (
      <View style={styles.container}>
        {this.renderToolbar()}

        <ScrollView contentContainerStyle={styles.stage}>
          <TableView>
            <Section header={I18n.t('info')}>
              <Cell cellStyle="RightDetail" title={I18n.t('version')} detail={DeviceInfo.getReadableVersion()} />
              <Cell cellStyle="RightDetail" title={I18n.t('language')} detail={deviceLocale} />
              <Cell
                cellStyle="Basic"
                title={I18n.t('disclaimer')}
                onPress={() => Alert.alert(
                  I18n.t('disclaimer'),
                  I18n.t('disclaimer_full'),
                  [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ]
                )}
              />
              <Cell
                cellStyle="Basic"
                title={I18n.t('feedback')}
                onPress={() => {
                  Linking.openURL('https://goo.gl/forms/Vng3RgmkSpSMnel52');
                }}
              />
              <Cell
                cellStyle="Basic"
                title={I18n.t('rate_us')}
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('itms-apps://itunes.apple.com/app/id1123557731');
                  } else if (Platform.OS === 'android') {
                    Linking.openURL('market://details?id=com.kfpun.bitcoin');
                  }
                }}
              />
            </Section>

            <Section header={I18n.t('others')}>
              <Cell
                cellStyle="Basic"
                title={I18n.t('view_more_bt_this_developer')}
                onPress={() => {
                  if (Platform.OS === 'ios') {
                    Linking.openURL('https://itunes.apple.com/us/developer/kf-pun/id1116896894');
                  } else if (Platform.OS === 'android') {
                    Linking.openURL('https://play.google.com/store/apps/developer?id=Kf');
                  }
                }}
              />
            </Section>
          </TableView>

          <AdmobCell bannerSize="mediumRectangle" />
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    );
  }
}

MoreView.propTypes = {
  title: React.PropTypes.string,
};

MoreView.defaultProps = {
  title: '',
};
