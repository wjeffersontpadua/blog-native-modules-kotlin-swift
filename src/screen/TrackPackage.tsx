import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import PackageTracker, {TrackPackageResult} from '../native/PackageTracker';
import {PackageDetails} from './components/PackageDetails';

export const TrackPackage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [packageId, setPackageId] = useState('');
  const [loading, setLoading] = useState(false);

  const [packageInfo, setPackageInfo] = useState<TrackPackageResult>();

  const handleTrackPackage = async () => {
    setLoading(true);
    setPackageInfo(undefined);

    await PackageTracker.track({id: packageId, verificationCode})
      .then(setPackageInfo)
      .catch(error => Alert.alert(error.message));

    setLoading(false);
  };

  return (
    <SafeAreaView style={style.container}>
      <TextInput placeholder="Package Id" onChangeText={setPackageId} />
      <TextInput
        placeholder="Verification Code"
        onChangeText={setVerificationCode}
      />

      <Button
        disabled={loading}
        onPress={handleTrackPackage}
        title="Track Package"
      />

      {loading && <ActivityIndicator />}

      {packageInfo && <PackageDetails data={packageInfo} />}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
