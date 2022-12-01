package com.modulestutorial

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.*
import java.util.*

data class Package(val id: String, val verificationCode: String, val distance: Int, val status: String)

val packages = listOf(Package("WS1", "WSROCKS", 5000, "moving"), Package("WS2", "WSRN", 0, "delivered"))

class PackageTrackerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    @ReactMethod
    fun track(data: ReadableMap, promise: Promise) {
        val id = data.getString("id")
        val verificationCode = data.getString("verificationCode")

        if(id == null || verificationCode == null) {
            promise.reject("PACKAGE_NOT_FOUND", "Id and Verification code didn't match a package")

            return
        }

        val handler = Handler(Looper.getMainLooper())

        handler.postDelayed({
            val matchingPackage = packages.find { it.id == id && it.verificationCode == verificationCode }

            if (matchingPackage == null) {
                promise.reject("PACKAGE_NOT_FOUND", "Id and Verification code didn't match a package")

                return@postDelayed
            }

            val response = Arguments.createMap().apply {
                putMap("request", data)
                putInt("distance", matchingPackage.distance)
                putString("status", matchingPackage.status)
            }


            promise.resolve(response)

        }, 5000)
    }

    override fun getName(): String {
        return "PackageTrackerModule"
    }
}