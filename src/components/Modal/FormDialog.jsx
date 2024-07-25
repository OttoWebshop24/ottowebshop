import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({open, setOpen}) {

    const [text, setText] = useState("");
    const [textGroup, setTextGroup] = useState("");
    const [errorGroup, setErrorGroup] = useState(text.length <=  4 && text.length >= 1);
    const [helperTextGroup, setHelperTextGroup] = useState(text.length <=  4 && text.length >= 1? 'ID is too short' : ' ');

    const [error, setError] = useState(text.length <=  4 && text.length >= 1);
    const [helperText, setHelperText] = useState(text.length <=  4 && text.length >= 1? 'ID is too short' : ' ');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
            if(text.length < 10){
            setError(true);
            setHelperText("Please enter your correct ID.");
            }
            /*if(window.GROUPS[textGroup] === undefined){
                setErrorGroup(true);
                setHelperTextGroup("Please enter your correct Group-Nr.");
            }*/
        else{
            window.results.id = document.getElementById("id-input").value;
          //  window.results.group = document.getElementById("group-input").value;
            setOpen(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Willkommen im OTTO Shop!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Deine Aufgabe im OTTO Shop ist es, einen Geschirrspüler zu kaufen.<br/>
                        <br/>
                        Um ein Produkt zu kaufen, legst du es in den Einkaufswagen und klickst anschließend auf deinen Einkaufskorb in der oberen rechten Ecke. Dort klickst du dann auf „Checkout“, um den Einkauf abzuschließen.<br/>
                        <br/>
                        <strong>Hinweis:</strong> Bitte habe etwas Geduld, da die Ladezeiten länger als üblich sein können                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Go!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
/*<TextField
                     autoFocus
                     margin="dense"
                     id="group-input"
                     label="GROUP-NUMBER"
                     type="id"
                     value={textGroup}
                     onChange={event => setTextGroup(event.target.value)}
                     error={errorGroup}
                     helperText={helperTextGroup}
                     fullWidth
                 />*/