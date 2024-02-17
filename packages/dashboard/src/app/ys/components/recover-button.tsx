"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { YS_KEY_PREFIX } from "@ys/constants";
import { recovery } from "@/utils/localforage/recover";
import { getLogger } from "@/utils/logger";
import { ChangeEvent } from "react";
import { useAppDispatch } from "@ys/hooks";
import { fetchAccounts } from "@ys/features/accounts/thunks";

export function RecoverButton() {
  const logger = getLogger(RecoverButton);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const content = e.target.result;
        try {
          const parsedJSON = JSON.parse(content);
          await recovery(parsedJSON, YS_KEY_PREFIX);
          dispatch(fetchAccounts()); // Reload
          toast({
            description: "操作成功",
          });
        } catch (error) {
          logger.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    document.getElementById("recover-button-upload")?.click();
  };

  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        恢复数据
      </Button>
      <input
        id="recover-button-upload"
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
}
