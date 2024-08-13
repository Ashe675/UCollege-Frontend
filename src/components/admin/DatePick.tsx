import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

type DatePickProps = {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  label : string,
  disable? : boolean
};

export default function DatePick({ value, onChange, label, disable }: DatePickProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        disabled = {disable}
        format="dd/MM/yyyy hh:mm a"
        sx={{
          // También puedes usar sx para más personalización
          ".MuiInputBase-root": {},
          ".MuiOutlinedInput-root": {
            borderRadius: "0.375rem", // Tailwind class rounded-md equivalent
          },
          ".MuiSvgIcon-root": {
            color: "#4a5568", // Tailwind class text-gray-600 equivalent
          },
        }}
      />
    </LocalizationProvider>
  );
}
