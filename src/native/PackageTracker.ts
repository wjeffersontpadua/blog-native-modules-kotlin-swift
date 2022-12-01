import {NativeModules} from 'react-native';

export interface TrackPackageRequest {
  id: string;
  verificationCode: string;
}

export interface TrackPackageResult {
  request: TrackPackageRequest;

  distance: number;

  status: 'moving' | 'delivered';
}

export interface PackageTracker {
  track: (request: TrackPackageRequest) => Promise<TrackPackageResult>;
}

export default NativeModules.PackageTrackerModule as PackageTracker;
