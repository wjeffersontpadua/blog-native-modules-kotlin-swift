//
//  PackageTrackerModule.swift
//  ModulesTutorial
//
//  Created by Jefferson Tavares de Pádua on 28/10/22.
//

import Foundation
import React

struct Package {
  let id: String
  let verificationCode: String
  let distance: Int
  let status: String
}

let packages: [Package] = [
  Package(id: "WS1", verificationCode:"WSROCKS", distance: 5000, status: "moving"),
  Package(id: "WS2", verificationCode:"WSRN", distance: 0, status: "delivered"),
]

@objc(PackageTrackerModule)
class PackageTrackerModule : NSObject {
  
  
  @objc
  func requiresMainQueueSetup() -> Bool {
      return true
  }
  
  @objc
  func track(_ data: NSDictionary,  resolver resolve: @escaping RCTPromiseResolveBlock,  rejecter reject: @escaping RCTPromiseRejectBlock) {
        guard let id = data["id"] as? String, let verificationCode = data["verificationCode"] as? String else {
      reject("PACKAGE_NOT_FOUND", "Id and Verification code didn't match a package", nil)
      
      return
    }
    
    reject()
    
    let matchingPackage = packages.first{ $0.id == id && $0.verificationCode == verificationCode }
    
    DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
      if let matched = matchingPackage {
        resolve(["request": data, "distance": matched.distance, "status": matched.status])
      } else {
        reject("PACKAGE_NOT_FOUND", "Id and Verification code didn't match a package", nil)
      }
    }
  }
}
