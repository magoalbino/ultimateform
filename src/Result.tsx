import {MainContainer} from "./components/MainContainer";
import {
  List,
  ListItem, ListItemIcon, ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useData} from "./components/DataContext";
import {InsertDriveFile} from "@mui/icons-material";
import {PrimaryButton} from "./components/PrimaryButton";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'

export function Result() {
  const {data} = useData()
  const entries = Object.entries(data).filter(entry => entry[0] !== "files")
  const { files } = data

  const onSubmit = async () => {
    const formData = new FormData()
    if (data.files) {
      data.files.forEach((file: File) => {
        formData.append("files", file, file.name)
      })
    }
    entries.forEach(entry => {
      formData.append(entry[0], entry[1])
    })

    const res = await fetch('http://localhost:4000', {
      method: 'POST',
      body: formData,
    })

    if (res.status === 200) {
      await Swal.fire("Great Job!", "You've passed the challenge!", "success");
    }
  }

  return (
    <MainContainer>
      <Typography component={'h2'}> Form values </Typography>
      <TableContainer component={Paper} sx={{marginBottom: '30px'}}>
        <Table sx={{marginBottom: '30px'}}>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align={'right'}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { entries.map(entry => (
              <TableRow key={entry[0]}>
                <TableCell>
                  {entry[0]}
                </TableCell>
                <TableCell>
                  {entry[1].toString()}
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      {
        files && (
          <>
            <Typography>Files</Typography>
            <List>
              {files.map((f: File, index: number) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )
      }
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link to={'/'}>Start Over</Link>
    </MainContainer>
  );
}