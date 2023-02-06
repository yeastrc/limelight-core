package org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication;


/**
 * 
 *
 */
public class RunFeatureDetectionService_CancelRequest_ReceiveObject {

	private String cancel_message;

	@Override
	public String toString() {
		return "RunFeatureDetectionService_CancelRequest_ReceiveObject [cancel_message=" + cancel_message + "]";
	}

	public String getCancel_message() {
		return cancel_message;
	}

	public void setCancel_message(String cancel_message) {
		this.cancel_message = cancel_message;
	}
}
