"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BackupButton } from "./components/backup-button";
import { RecoverButton } from "./components/recover-button";
import { CharactersPanel } from "./components/characters-panel";
import { CharacterMeta } from "@sr/features/characters/types";
import StoreProvider from "@sr/store-provider";
import { OwnershipFilterSelect } from "./components/ownership-filter-select";
import { RelicsetsPanel } from "./components/relicsets-panel";
import { RelicsetMeta } from "./features/relicsets/types";

export type PageContentProps = {
  characters?: CharacterMeta[];
  relicsets?: RelicsetMeta[];
};

export function PageContent({ characters = [], relicsets = [] }: PageContentProps) {
  return (
    <StoreProvider characters={characters}>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold tracking-tighter leading-tight md:text-4xl">
            崩坏：星穹铁道
          </h1>
        </div>
        <Tabs defaultValue="image-text">
          <nav className="flex gap-4">
            <TabsList>
              <TabsTrigger value="text">文字</TabsTrigger>
              <TabsTrigger value="image-text">图文</TabsTrigger>
              <TabsTrigger value="relicsets">遗器</TabsTrigger>
            </TabsList>
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
          <TabsContent value="relicsets">
            <RelicsetsPanel relicsets={relicsets}  />
          </TabsContent>
        </Tabs>
      </section>
    </StoreProvider>
  );
}
