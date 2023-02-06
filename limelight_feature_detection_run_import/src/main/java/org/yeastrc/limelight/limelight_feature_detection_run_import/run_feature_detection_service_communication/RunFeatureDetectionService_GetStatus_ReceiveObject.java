package org.yeastrc.limelight.limelight_feature_detection_run_import.run_feature_detection_service_communication;


/**
 * 
 *
 */
public class RunFeatureDetectionService_GetStatus_ReceiveObject {

	private String request_id;
	private String status;
	private String error_message;
	private String end_user_message;
	private String queue_position;

	@Override
	public String toString() {
		return "RunFeatureDetectionService_GetStatus_ReceiveObject [request_id=" + request_id + ", status=" + status
				+ ", error_message=" + error_message + ", end_user_message=" + end_user_message + ", queue_position="
				+ queue_position + "]";
	}

	public String getRequest_id() {
		return request_id;
	}

	public void setRequest_id(String request_id) {
		this.request_id = request_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getError_message() {
		return error_message;
	}

	public void setError_message(String error_message) {
		this.error_message = error_message;
	}

	public String getEnd_user_message() {
		return end_user_message;
	}

	public void setEnd_user_message(String end_user_message) {
		this.end_user_message = end_user_message;
	}


	public String getQueue_position() {
		return queue_position;
	}


	public void setQueue_position(String queue_position) {
		this.queue_position = queue_position;
	}

}
