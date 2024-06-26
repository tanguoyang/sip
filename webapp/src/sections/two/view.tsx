// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DeviceRepo, Device } from 'src/apis/database';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TwoView() {
  const settings = useSettingsContext();
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    DeviceRepo.getAllDocsByUid().then(setDevices).catch(console.log);
  }, []);

  const handleDelete = (id: string) => {
    DeviceRepo.deleteDoc(id).then(() => {
      setDevices(devices.filter((device) => device.id !== id));
    });
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
        Devices
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Last Called</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.description}</TableCell>
                <TableCell>
                  {device.lastCalled ? new Date(device.lastCalled).toLocaleString() : 'Never'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(device.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
