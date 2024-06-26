import { useEffect, useState } from 'react';
import axios from 'axios';
import { Device, DeviceRepo } from 'src/apis/database';

const useGetDevices = (): [Device[], () => void] => {
  const [devices, setDevices] = useState<Device[]>([]);

  const refreshDevices = () => {
    DeviceRepo.getAllDocsByUid().then(setDevices).catch(console.log);
  };

  useEffect(() => {
    refreshDevices();
  }, []);

  return [devices, refreshDevices];
};

export default useGetDevices;
