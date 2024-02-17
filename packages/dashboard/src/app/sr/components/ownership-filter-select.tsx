import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAppDispatch, useAppSelector } from "@sr/hooks";
import { setOwnershipFilter } from "@sr/features/view/slice";
import { OwnershipFilter } from "@sr/features/view/types";

export const OwnershipFilterSelect = () => {
  const { ownershipFilter } = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  return (
    <Select
      value={ownershipFilter}
      onValueChange={(value: string) =>
        dispatch(setOwnershipFilter(value as OwnershipFilter))
      }
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="所有权" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="both">所有权（全部）</SelectItem>
        <SelectItem value="true">所有权（拥有）</SelectItem>
        <SelectItem value="false">所有权（未拥有）</SelectItem>
      </SelectContent>
    </Select>
  );
};
