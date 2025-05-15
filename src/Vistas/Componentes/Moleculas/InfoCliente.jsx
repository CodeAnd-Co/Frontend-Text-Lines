import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, useTheme, Button, CircularProgress } from '@mui/material';
import Texto from '@Atomos/Texto';
import Icono from '@Atomos/Icono';
import CampoTexto from '@Atomos/CampoTexto';
import { tokens } from '@SRC/theme';

const ClientInfo = ({
  editMode = false,
  clientId,
  legalName,
  displayName,
  employees,
  assignedUsers,
  imageUrl,
  onChange,
  onImageChange,
  imageUploading = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const fileInputRef = useRef(null);
  const MAX_LENGTH = 100;

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validJpgTypes = ['image/jpeg', 'image/jpg'];
    if (!validJpgTypes.includes(file.type.toLowerCase())) {
      if (onImageChange) {
        onImageChange({
          error: 'Only JPG or JPEG images are allowed.',
        });
      }
      event.target.value = '';
      return;
    }

    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      if (onImageChange) {
        onImageChange({
          error: 'Image is too large. Maximum allowed size is 4MB.',
        });
      }
      event.target.value = '';
      return;
    }

    if (onImageChange) {
      const preview = URL.createObjectURL(file);

      onImageChange({
        file,
        preview,
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={6} mb={4}>
        {/* Main Information */}
        <Grid>
          <Texto gutterBottom mb={2.5}>
            <strong>INFORMATION</strong>{' '}
          </Texto>

          {editMode ? (
            <Box sx={{ maxWidth: 325 }}>
              <CampoTexto
                label='Client ID'
                name='clientId'
                value={clientId}
                onChange={onChange}
                type='text'
                fullWidth
                required
                disabled={true}
                sx={{ mb: 4 }}
              />
              <CampoTexto
                label='Legal Name'
                name='legalName'
                value={legalName || ''}
                onChange={onChange}
                type='text'
                fullWidth
                required
                inputProps={{ maxLength: MAX_LENGTH }}
                helperText={`${(legalName || '').length}/${MAX_LENGTH} characters`}
                sx={{ mb: 4 }}
              />
              <CampoTexto
                label='Display Name'
                name='displayName'
                value={displayName || ''}
                onChange={onChange}
                type='text'
                fullWidth
                required
                inputProps={{ maxLength: MAX_LENGTH }}
                helperText={`${(displayName || '').length}/${MAX_LENGTH} characters`}
                sx={{ mb: 4 }}
              />
            </Box>
          ) : (
            <>
              <Texto gutterBottom mb={4}>
                Client ID:{' '}
                <a style={{ color: colors.texto[4], fontWeight: 500, textDecoration: 'none' }}>
                  {clientId}
                </a>
              </Texto>
              <Texto gutterBottom mb={4}>
                Legal Name:{' '}
                <a style={{ color: colors.texto[4], textDecoration: 'none' }}>{legalName}</a>
              </Texto>
              <Texto gutterBottom>
                Display Name: <span style={{ color: colors.texto[4] }}>{displayName}</span>
              </Texto>
            </>
          )}
        </Grid>

        {/* Additional Information (always read-only) */}
        <Grid>
          <Texto gutterBottom mb={2.5}>
            <strong>ADDITIONAL INFORMATION</strong>{' '}
          </Texto>

          <Texto gutterBottom mb={4}>
            Assigned Users:{' '}
            <a style={{ color: colors.texto[4], textDecoration: 'none' }}>{assignedUsers}</a>
          </Texto>
          <Texto gutterBottom mb={4}>
            Employees: <a style={{ color: colors.texto[4], textDecoration: 'none' }}>{employees}</a>
          </Texto>
        </Grid>
      </Grid>

      {/* Image Preview */}
      <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
        IMAGE PREVIEW
      </Texto>
      <Box
        sx={{
          maxWidth: '240px',
          height: '120px',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          alt='Preview'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageUrl ? 'block' : 'none',
          }}
        />
        {imageUploading && (
          <CircularProgress
            size={40}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
        )}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: !imageUrl ? colors.acciones[3] : 'transparent',
          }}
        />
        {!imageUrl && (
          <Icono
            nombre='ImageOutlined'
            size='large'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
            }}
          />
        )}
      </Box>

      {editMode && (
        <>
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/jpeg,image/jpg'
            style={{ display: 'none' }}
          />
          <Button
            variant='outlined'
            size='small'
            onClick={handleFileSelect}
            startIcon={<Icono nombre='Upload' />}
            disabled={imageUploading}
            sx={{ mb: 4 }}
          >
            {imageUploading ? 'Uploading...' : 'Upload JPG Image'}
          </Button>
          <Texto
            variant='caption'
            display='block'
            sx={{ mb: 4, color: theme.palette.text.secondary }}
          >
            Only JPG/JPEG images allowed, up to 5MB.
          </Texto>
        </>
      )}

      {/* Error message block was commented out in original */}
      {/* {imageError && (
        <Alerta type='error' message={imageError} closable sx={{ mb: 2 }} duration={2500}></Alerta>
      )} */}
    </Box>
  );
};

ClientInfo.propTypes = {
  editMode: PropTypes.bool,
  clientId: PropTypes.string.isRequired,
  legalName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  employees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  assignedUsers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string,
  onChange: PropTypes.func,
  onImageChange: PropTypes.func,
  imageUploading: PropTypes.bool,
  imageError: PropTypes.string,
};

export default ClientInfo;
