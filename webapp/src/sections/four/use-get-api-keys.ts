import { useEffect, useState } from 'react';
import { ApiKeyRepo, ApiKey } from 'src/apis/database';

const useGetApiKeys = (): [ApiKey[], () => void] => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  const refreshApiKeys = () => {
    ApiKeyRepo.getAllDocs().then(setApiKeys).catch(console.error);
  };

  useEffect(() => {
    refreshApiKeys();
  }, []);

  return [apiKeys, refreshApiKeys];
};

export default useGetApiKeys;
