// @mui
import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// components
import { useSettingsContext } from 'src/components/settings';
import useGetDevices from 'src/hooks/use-get-devices';
import useGetApiKeys from './use-get-api-keys';
import { ApiKey, ApiKeyDb, ApiKeyRepo } from 'src/apis/database';
import { v4 as uuidv4 } from 'uuid';
// ----------------------------------------------------------------------

const NEW_API_KEY: ApiKeyDb = {
  key: '',
  name: '',
  deviceIds: [],
};

export default function ApiKeysManagement() {
  const settings = useSettingsContext();
  const [apiKeys, refreshApiKeys] = useGetApiKeys();
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newApiKey, setNewApiKey] = useState<ApiKeyDb>(NEW_API_KEY);
  const [allDevices, refreshDevices] = useGetDevices();

  const handleOpenEditDialog = (key: ApiKey) => {
    setSelectedKey(key);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedKey(null);
  };

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    setNewApiKey(NEW_API_KEY);
  };

  const handleSaveDevices = async () => {
    if (!selectedKey) return;
    await ApiKeyRepo.updateDoc(selectedKey.id, selectedKey);
    refreshApiKeys();
    handleCloseEditDialog();
  };

  const handleCreateApiKey = async () => {
    if (!newApiKey.name) {
      alert('Key name is required');
      return;
    }
    try {
      let temp = newApiKey;
      temp.key = uuidv4();
      setNewApiKey(temp);
      await ApiKeyRepo.addDoc(temp);
      handleCloseAddDialog();
      refreshApiKeys();
      alert('API Key created successfully');
    } catch {
      handleCloseAddDialog();
      alert('Failed to create API Key');
    }
  };

  const handleRemoveApiKey = async (id: string) => {
    await ApiKeyRepo.deleteDoc(id);
    refreshApiKeys();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">API Keys Management</Typography>

      <Box sx={{ mt: 5, mb: 3 }}>
        <Button variant="contained" onClick={handleOpenAddDialog}>
          Add API Key
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell> */}
              {/* <TableCell>API Key</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiKeys.map((key) => (
              <TableRow key={key.id}>
                {/* <TableCell>{key.key}</TableCell> */}
                <TableCell>{key.name}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEditDialog(key)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveApiKey(key.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Manage API Key</DialogTitle>
        <DialogContent>
          {selectedKey && (
            <>
              <Typography variant="h6">API Key: {selectedKey.key}</Typography>
              <Typography variant="subtitle1">Name: {selectedKey.name}</Typography>
              <Box sx={{ mt: 2 }}>
                {allDevices.map((device) => (
                  <FormControlLabel
                    key={device.id}
                    control={
                      <Checkbox
                        checked={selectedKey.deviceIds.includes(device.id)}
                        onChange={() => {
                          const newDevices = selectedKey.deviceIds.includes(device.id)
                            ? selectedKey.deviceIds.filter((d) => d !== device.id)
                            : [...selectedKey.deviceIds, device.id];
                          setSelectedKey({ ...selectedKey, deviceIds: newDevices });
                        }}
                        name={device.name}
                      />
                    }
                    label={device.name}
                  />
                ))}
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveDevices} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add API Key</DialogTitle>
        <DialogContent>
          <TextField
            label="API Key Name"
            value={newApiKey.name}
            onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box>
            {allDevices.map((device) => (
              <FormControlLabel
                key={device.id}
                control={
                  <Checkbox
                    checked={newApiKey.deviceIds.includes(device.id)}
                    onChange={() => {
                      const newDevices = newApiKey.deviceIds.includes(device.id)
                        ? newApiKey.deviceIds.filter((d) => d !== device.id)
                        : [...newApiKey.deviceIds, device.id];
                      setNewApiKey({ ...newApiKey, deviceIds: newDevices });
                    }}
                    name={device.name}
                  />
                }
                label={device.name}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleCreateApiKey} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
