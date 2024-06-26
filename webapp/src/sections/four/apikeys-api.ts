import axios, { AxiosResponse } from 'axios';

interface ApiKey {
  name: string;
  key: string;
  devices: string[];
}

// Get API key API
export async function getAllApiKey(): Promise<ApiKey[]> {
  try {
    const response: AxiosResponse<ApiKey[]> = await axios.get(`localhost:5001/api/api-keys`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get API key');
  }
}

// Set API key API
export async function setApiKey(apiKey: ApiKey): Promise<void> {
  try {
    await axios.post('localhost:5001/api/api-keys/', apiKey);
  } catch (error) {
    throw new Error('Failed to set API key');
  }
}

// Edit API key API
export async function editApiKey(id: string, newApiKey: ApiKey): Promise<void> {
  try {
    await axios.patch(`localhost:5001/api/api-keys/${id}`, newApiKey);
  } catch (error) {
    throw new Error('Failed to edit API key');
  }
}

// Delete API key API
export async function deleteApiKey(id: string): Promise<void> {
  try {
    await axios.delete(`localhost:5001/api/api-keys/${id}`);
  } catch (error) {
    throw new Error('Failed to delete API key');
  }
}
