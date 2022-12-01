//
//  PackageTrackerModule.m
//  ModulesTutorial
//
//  Created by Jefferson Tavares de Pádua on 28/10/22.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PackageTrackerModule, NSObject)

RCT_EXTERN_METHOD(track: (NSDictionary)data resolver: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)

@end
