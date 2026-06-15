import { ApiEndpoint } from "~constants";
import { apiClient } from "~integrations";

import type { SignedUploadRequest, SignedUploadResponse } from "./uploads.types";

export const requestSignedUpload = (payload: SignedUploadRequest): Promise<SignedUploadResponse> =>
  apiClient.post<SignedUploadResponse>(ApiEndpoint.UploadsSign, payload);
