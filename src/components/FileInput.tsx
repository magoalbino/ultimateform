import {Controller, UseControllerProps} from 'react-hook-form'
import Dropzone from 'react-dropzone'
import {List, ListItem, ListItemIcon, ListItemText, Paper} from "@mui/material";
import {CloudUpload, InsertDriveFile} from "@mui/icons-material";

interface FileInputProps<T> extends UseControllerProps<T> {

}

export function FileInput({name, control}: FileInputProps<any>) {
  return (
    <Controller control={control} name={name} defaultValue={[]} render={
      ({field}) => {
        return (
          <>
            <Dropzone onDrop={field.onChange}>
              {({getRootProps, getInputProps}) => (
                <Paper variant={'outlined'} {...getRootProps()} sx={{
                  backgroundColor: '#eee',
                  textAlign: 'center',
                  cursor: 'pointer',
                  color: '#333',
                  padding: '10px',
                  marginTop: '20px'
                }}>
                  <CloudUpload sx={{marginTop: '16px', color: '#888', fontSize: '42px'}} />
                  <input {...getInputProps()} name={name} onBlur={field.onBlur}/>
                  <p>Drag 'n drop files here, or click to select files</p>
                </Paper>
              )}
            </Dropzone>
            <List>
              {field.value.map((file: File, index: number) => {
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <InsertDriveFile/>
                    </ListItemIcon>
                    <ListItemText primary={file.name} secondary={file.size}/>
                  </ListItem>
                )
              })}
            </List>
          </>
        );
      }
    }/>
  );
}