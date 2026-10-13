import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#07121f', paper: '#0b1a2a' },
    text: { primary: '#f4f7fb', secondary: '#9fb0c2' },
    primary: { main: '#4fb6ff' },
    secondary: { main: '#b9f56a' },
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { defaultProps: { elevation: 0 } },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
  },
})

export default theme
