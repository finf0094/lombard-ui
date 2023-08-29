import { useMemo, useState } from "react"
import { createTheme } from '@mui/material';
import { theme } from "./theme";

export const useColorTheme = () => {
    const [mode, setMode] = useState();

    const toggleColorMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

    const modifiedTheme = useMemo(() => {
        return createTheme({
          ...theme,
          palette: {
            ...theme.palette,
            mode,
          }
        });
      }, [mode]);


    return {
        theme: modifiedTheme,
        mode,
        toggleColorMode
    }
}