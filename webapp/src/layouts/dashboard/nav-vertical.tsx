import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useResponsive } from 'src/hooks/use-responsive';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import { NavToggleButton, NavUpgrade } from '../_common';
import { useTheme } from '@mui/material/styles';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { user } = useMockedUser();
  const pathname = usePathname();
  const lgUp = useResponsive('up', 'lg');
  const navData = useNavData();

  let theme = useTheme();
  // modify the theme to make background black and text white
  theme = createTheme({
    ...theme,
    palette: {
      mode: 'dark',
    },
    // palette: {
    //   background: {
    //     default: '#000000',
    //   },
    //   text: {
    //     primary: '#ffffff',
    //   },
    // },
  });
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        backgroundColor: 'black',
      }}
    >
      <Typography sx={{ mt: 3, ml: 4, mb: 1, color: 'white' }} variant="h6">
        Smart Infrastructure Platform
      </Typography>

      <NavSectionVertical
        data={navData}
        config={{
          currentRole: user?.role || 'admin',
        }}
      />

      <Box sx={{ flexGrow: 1 }} />

      {/* <NavUpgrade /> */}
    </Scrollbar>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV.W_VERTICAL },
        }}
      >
        <NavToggleButton />

        {lgUp ? (
          <Stack
            sx={{
              height: 1,
              position: 'fixed',
              width: NAV.W_VERTICAL,
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {renderContent}
          </Stack>
        ) : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            PaperProps={{
              sx: {
                width: NAV.W_VERTICAL,
              },
            }}
          >
            {renderContent}
          </Drawer>
        )}
      </Box>
    </ThemeProvider>
  );
}
