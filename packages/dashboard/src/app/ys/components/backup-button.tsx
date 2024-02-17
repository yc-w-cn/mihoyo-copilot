"use client";

import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { ISO_DATE_FORMAT, backup } from "@/utils";
import { YS_KEY_PREFIX } from "@/app/ys/constants";

export function BackupButton() {
  const handleExport = async () => {
    const data = await backup(YS_KEY_PREFIX);
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${YS_KEY_PREFIX}-exported-data-${dayjs().format(ISO_DATE_FORMAT)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" onClick={() => handleExport()}>
      备份数据
    </Button>
  );
}
