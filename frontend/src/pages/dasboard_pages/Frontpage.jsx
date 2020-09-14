import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import { format } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = (theme) => ({

    addPayDisplay: {
        width: '50%',
        height: '50%',
    },
    payDisplayItem: {
        width: '50%',
        height: '50%',
        '& Button': {
            color: 'white',
            width: '75%',
        },
    },
    redBg: {
        'background-color': 'red',
        '&:hover': {
            'background-color': 'red',
            opacity: '0.7',
        }
    },
    greenBg: {
        'background-color': 'green',
        '&:hover': {
            'background-color': 'green',
            opacity: '0.7',
        }
    },
    dialogItem: {
        margin: '5px'
    }
})

class Frontpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogs: [false, false, false, false],
            selectedDate: Date.now(),
            amount: null,
            title: null,
        }
    }

    handleDialogClose = () => {
        let tempArr = [false, false, false, false]
        this.setState({ dialogs: tempArr })
    }

    handleDialogOpen = (index) => {
        let tempArr = [false, false, false, false]
        tempArr[index] = true
        this.setState({ dialogs: tempArr, selectedDate: Date.now() })
    }

    handleDateChange = (e) => {
        let dateToSave = format(e, 'yyyy-MM-dd')
        this.setState({ selectedDate: dateToSave })
    }

    handleChange = (e) => {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value })
    }

    customDialog = (open, title, type, negOrPos) => {
        let { selectedDate } = this.state
        const { classes } = this.props

        const inputProps = {
            min: 1,
        };

        return (
            <Dialog
                open={open}
                onClose={this.handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    ><TextField id="title" onChange={this.handleChange} label="Title" variant="outlined" className={classes.dialogItem} />
                        <TextField id="amount" onChange={this.handleChange} type="number" label="Amount" variant="outlined" className={classes.dialogItem} inputProps={inputProps} />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around" className={classes.dialogItem}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Date picker inline"
                                    value={selectedDate}
                                    onChange={this.handleDateChange}
                                    inputVariant="outlined"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider></Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose}>
                        Cancel
                </Button>
                    <Button onClick={this.handleDialogClose} autoFocus>
                        Save
                </Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        const { classes } = this.props
        const { dialogs } = this.state
        return (
            <>
                <Grid container justify-content="space-evenly" className={classes.addPayDisplay}>
                    <Grid container direction="row">
                        <Grid alignItems="center" justify="center" className={classes.payDisplayItem} container><Button onClick={() => this.handleDialogOpen(0)} variant="contained" className={classes.redBg}>Add payment</Button></Grid>
                        <Grid alignItems="center" justify="center" className={classes.payDisplayItem} container><Button onClick={() => this.handleDialogOpen(1)} variant="contained" className={classes.redBg}>Add subscription</Button></Grid>
                        <Grid alignItems="center" justify="center" className={classes.payDisplayItem} container><Button onClick={() => this.handleDialogOpen(2)} variant="contained" className={classes.greenBg}>Add received payment</Button></Grid>
                        <Grid alignItems="center" justify="center" className={classes.payDisplayItem} container><Button onClick={() => this.handleDialogOpen(3)} variant="contained" classes={{ root: classes.greenBg }}>Add salary</Button></Grid>
                    </Grid>
                </Grid>
                {this.customDialog(dialogs[0], 'Add payment', 'single', 'negative')}
                {this.customDialog(dialogs[1], 'Add subscription', 'subscription', 'negative')}
                {this.customDialog(dialogs[2], 'Add received payment', 'single', 'positive')}
                {this.customDialog(dialogs[3], 'Add salary', 'subscription', 'positive')}
            </>
        );
    }
}

export default withStyles(styles)(Frontpage)