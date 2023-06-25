import { useFieldArray, Controller } from 'react-hook-form';
import { TextField, Button, Grid } from '@material-ui/core';

export const FunctionForm = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `functions[${nestIndex}].parameters`
  });

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Controller
          name={`functions[${nestIndex}].name`}
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Function Name" />}
        />
      </Grid>
      <Grid item>
        <Controller
          name={`functions[${nestIndex}].description`}
          control={control}
          defaultValue=""
          render={({ field }) => <TextField {...field} label="Function Description" />}
        />
      </Grid>
      {fields.map((item, k) => {
        return (
          <Grid container item key={item.id} spacing={2}>
            <Grid item xs={4}>
              <Controller
                name={`functions[${nestIndex}].parameters[${k}].name`}
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Parameter Name" />}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`functions[${nestIndex}].parameters[${k}].type`}
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Parameter Type" />}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name={`functions[${nestIndex}].parameters[${k}].description`}
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Parameter Description" />}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={() => remove(k)}>
                Delete Parameter
              </Button>
            </Grid>
          </Grid>
        );
      })}
      <Grid item>
        <Button variant="outlined" color="primary" onClick={() => append({ name: '', type: '', description: '' })}>
          Add Parameter
        </Button>
      </Grid>
    </Grid>
  );
};
