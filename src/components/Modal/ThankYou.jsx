import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ThankYou({open}) {
    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"> Danke für deine Teilnahme!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Gehe nun bitte zurück zur Umfrage und gebe dort folgende Gruppenzugehörigkeit in dem Umfragetool an:
                       <br/><strong>{window.results.eEfficiencyGroup}</strong><br/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
