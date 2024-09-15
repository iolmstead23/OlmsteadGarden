declare module "flowbite-react" {
  import { FC } from "react";

  interface DatepickerProps {
    maxDate?: Date;
    weekStart?: number;
    defaultDate?: Date;
    inline?: boolean;
    onSelectedDateChanged?: (date: Date) => void;
  }

  export const Datepicker: FC<DatepickerProps>;
}
