import React from 'react';
import {View, Text} from 'react-native';
import {TrackPackageResult} from '../../native/PackageTracker';

interface PackageDetailsProps {
  data: TrackPackageResult;
}

export const PackageDetails = ({data}: PackageDetailsProps) => {
  return (
    <View>
      <Text>The package {data.request.id} is</Text>
      {data.status === 'moving' && (
        <>
          <Text>{data.distance / 1000}/km away</Text>
        </>
      )}

      {data.status === 'delivered' && <Text>Right by your door</Text>}
    </View>
  );
};
