export interface SignedUploadRequest {
  fileName: string;
  contentType: string;
}

export interface SignedUploadResponse {
  signedUrl: string;
  publicUrl: string;
}
