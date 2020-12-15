import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 800
    },
});

const valueText = (value: number):string => {
    let hours: number | string = Math.floor(value/60);
    let minutes: number | string = value%60;
    if(hours<10) hours = "0"+hours;
    if(minutes<10) minutes = "0"+minutes;
    return `${hours}:${minutes}`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([600, 640]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Temperature range
      </Typography>
            <Slider
                min={0}
                step={5}
                marks
                max={60*24}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                valueLabelFormat={value => <div>{valueText(value)}</div>}
            />
        </div>
    );
}