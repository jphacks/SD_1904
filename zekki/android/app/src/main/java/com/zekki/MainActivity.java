package com.zekki;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import android.os.Bundle;
import android.app.Activity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is
   * used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zekki";
  }

  // for telling to react alarmID
  public static class AlarmActivityDelegate extends ReactActivityDelegate {
    private static final String ALARM_ID = "alarmID";
    private Bundle mInitialProps = null;
    private final Activity mActivity;

    public AlarmActivityDelegate(Activity activity, String mainComponentName) {
      super(activity, mainComponentName);
      this.mActivity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      // bundle is where we put our alarmID with launchIntent.putExtra
      Bundle bundle = mActivity.getIntent().getExtras();
      if (bundle != null && bundle.containsKey(ALARM_ID)) {
        mInitialProps = new Bundle();
        // put any initialProps here
        mInitialProps.putString(ALARM_ID, bundle.getString(ALARM_ID));
      }
      super.onCreate(savedInstanceState);
    }

    @Override
    protected Bundle getLaunchOptions() {
      return mInitialProps;
    }
  };

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new AlarmActivityDelegate(this, getMainComponentName());
  }
}
