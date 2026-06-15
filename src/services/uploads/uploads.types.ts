export interface SignedUploadRequest {
  fileName: string;
  contentType: string;
}

export interface SignedUploadResponse {
  uploadUrl: string;
  publicUrl: string;
}
