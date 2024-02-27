"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BackupButton } from "./components/backup-button";
import { RecoverButton } from "./components/recover-button";
import { CharactersPanel } from "./components/characters-panel";
import { CharacterMeta } from "@bh3/features/characters/types";
import StoreProvider from "@bh3/store-provider";
import { OwnershipFilterSelect } from "./components/ownership-filter-select";
import { ShowGroupCheckbox } from "./components/show-group-checkbox";
import { DashboardPanel } from "./components/dashboard-panel";

export type PageContentProps = {
  characters?: CharacterMeta[];
};

export function PageContent({ characters = [] }: PageContentProps) {
  return (
    <StoreProvider characters={characters}>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            崩坏3
          </h1>
        </div>
        <Tabs defaultValue="image-text">
          <nav className="flex gap-4">
            <TabsList>
              <TabsTrigger value="text">文字</TabsTrigger>
              <TabsTrigger value="image-text">图文</TabsTrigger>
              <TabsTrigger value="dashboard">面板</TabsTrigger>
            </TabsList>
            <ShowGroupCheckbox />
            <OwnershipFilterSelect />
            <BackupButton />
            <RecoverButton />
          </nav>
          <TabsContent value="text">
            <CharactersPanel showImage={false} />
          </TabsContent>
          <TabsContent value="image-text">
            <CharactersPanel showImage={true} />
          </TabsContent>
          <TabsContent value="dashboard">
            <DashboardPanel />
          </TabsContent>
        </Tabs>
      </section>
    </StoreProvider>
  );
}
