import { Checkbox } from "@/components/ui/checkbox";
import { setShowGroup } from "@bh3/features/view/slice";
import { useAppDispatch, useAppSelector } from "@bh3/hooks";

export const ShowGroupCheckbox = () => {
  const { showGroup } = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  return (
    <span className="flex gap-1 items-center">
      <Checkbox
        checked={showGroup}
        onCheckedChange={(checked) => dispatch(setShowGroup(!!checked))}
      />
      显示分组
    </span>
  );
};
