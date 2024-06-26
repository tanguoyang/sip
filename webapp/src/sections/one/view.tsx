import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { LogsRepo, Log } from 'src/apis/database';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    LogsRepo.getAllDocs()
      .then((logs) => {
        console.log('Fetched logs:', logs);
        setLogs(logs);
      })
      .catch((error) => {
        console.error('Error fetching logs:', error);
      });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
        Logs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={log.status}
                    sx={{
                      color: 'common.white',
                      backgroundColor: (theme) =>
                        log.status == 'error' ? theme.palette.error.main : theme.palette.info.main,
                    }}
                  />
                </TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
