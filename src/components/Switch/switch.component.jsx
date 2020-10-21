import React from 'react';
import Switch from '@material-ui/core/Switch';
import { lightGreen} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const SwitchBtn = () =>
{
    const [state, setState] = React.useState({
        checkedA: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return(
        <div>
            <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
        </div>
    )
}
const GreenBtn = withStyles({
    switchBase: {
      color: "",
      '&$checked': {
        color: lightGreen[500],
      },
      '&$checked + $track': {
        backgroundColor: lightGreen[500],
      },
    },
    checked: {},
    track: {},
  })(SwitchBtn)


export default GreenBtn  