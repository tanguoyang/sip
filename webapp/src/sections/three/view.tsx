// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Paper, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { DeviceRepo } from 'src/apis/database';
import { Device, DeviceDb } from 'src/apis/database/models';

// ----------------------------------------------------------------------

const NEW_DEVICE: DeviceDb = {
  name: '',
  description: '',
  lastCalled: null,
};

export default function AddDevice() {
  const settings = useSettingsContext();
  const [newDevice, setNewDevice] = useState(NEW_DEVICE);
  const [deviceId, setDeviceId] = useState('');

  const handleAddDevice = () => {
    // fields cannot be blank
    if (!newDevice.name || !newDevice.description || !deviceId) {
      alert('Please fill in all fields');
      return;
    }

    DeviceRepo.setDoc(deviceId, newDevice)
      .then(() => {
        alert('Device added successfully');
        setNewDevice(NEW_DEVICE);
        setDeviceId('');
      })
      .catch(console.warn);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Device
        </Typography>
        <TextField
          fullWidth
          label="Device ID"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Name"
          value={newDevice.name}
          onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={newDevice.description}
          onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddDevice}>
          Add Device
        </Button>
      </Paper>
    </Container>
  );
}
