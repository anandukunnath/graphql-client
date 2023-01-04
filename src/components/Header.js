import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../styles/components/header.css'

export default function Header() {
  return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <div className='header-title'>
                <Typography  variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    Movie Catalogue
                </Typography>
                </div>
                
            </AppBar>
        </Box>
  )
}