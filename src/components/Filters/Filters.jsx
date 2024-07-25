import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const Filters = ({ filterProducts, keys }) => {
    const drawerWidth = 190;
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            zIndex: 5
        },
        drawerPaper: {
            width: drawerWidth,
            top: '8%',
        },
        drawerContainer: {
            marginTop: 30,
            padding: 20,
            overflow: 'hidden',
        },
        formControl: {
            marginBottom: theme.spacing(2),
        },
        controlLabel: {
            paddingTop: '7px',
            paddingBottom: '7px'
        },
        clearButton: {
            marginTop: theme.spacing(2),
        }
    }));

    const classes = useStyles();
    const [efficiency, setEfficiency] = useState(keys.a ? 'a' : keys.b ? 'b' : keys.c ? 'c' : keys.d ? 'd' : '');
    const [color, setColor] = useState(keys.white ? 'white' : keys.grey ? 'grey' : keys.black ? 'black' : '');

    const handleEfficiencyChange = (e) => {
        const newEfficiency = e.target.value;
        setEfficiency(newEfficiency);

        const updatedKeys = {
            ...keys,
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            [newEfficiency]: true
        };
        window.results.filterUsageEfficiency++;
        filterProducts(updatedKeys);
    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setColor(newColor);

        const updatedKeys = {
            ...keys,
            white: false,
            grey: false,
            black: false,
            [newColor]: true
        };
        window.results.filterUsageColor++;
        filterProducts(updatedKeys);
    };

    const clearFilters = () => {
        const clearedKeys = {
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            white: false,
            grey: false,
            black: false
        };
        setEfficiency('');
        setColor('');
        filterProducts(clearedKeys);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerContainer}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Energy Efficiency</FormLabel>
                    <RadioGroup aria-label="efficiency" name="efficiency" value={efficiency} onChange={handleEfficiencyChange}>
                        <FormControlLabel value="a" control={<Radio />} label="A" />
                        <FormControlLabel value="b" control={<Radio />} label="B" />
                        <FormControlLabel value="c" control={<Radio />} label="C" />
                        <FormControlLabel value="d" control={<Radio />} label="D" />
                        <FormControlLabel value="e" control={<Radio />} label="E" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Color</FormLabel>
                    <RadioGroup aria-label="color" name="color" value={color} onChange={handleColorChange}>
                        <FormControlLabel value="white" control={<Radio />} label="White" />
                        <FormControlLabel value="grey" control={<Radio />} label="Grey" />
                        <FormControlLabel value="black" control={<Radio />} label="Black" />
                    </RadioGroup>
                </FormControl>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.clearButton}
                    onClick={clearFilters}
                >
                    Clear Filters
                </Button>
            </div>
        </Drawer>
    );
};

export default Filters;
