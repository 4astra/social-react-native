package vn.haiwinmedia.yourads;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.wix.RNCameraKit.RNCameraKitPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import co.apptailor.googlesignin.RNGoogleSigninPackage;
//import com.wix.RNCameraKit.RNCameraKitPackage;


public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

      @Override
      protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
                  new MainReactPackage(),
                  new RNCameraKitPackage(),
                  new RNGoogleSigninPackage(),
                  //**  ADD THE FOLLOWING LINE **//
                  new FBSDKPackage(mCallbackManager),
                  new VectorIconsPackage()

          );
      }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
      FacebookSdk.sdkInitialize(getApplicationContext());
      SoLoader.init(this, /* native exopackage */ false);
  }
}