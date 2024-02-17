"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BackupButton } from "./components/backup-button";
import { RecoverButton } from "./components/recover-button";
import { CharactersPanel } from "./components/characters-panel";
import { CharacterMeta } from "@sr/features/characters/types";
import StoreProvider from "@sr/store-provider";
import { OwnershipFilterSelect } from "./components/ownership-filter-select";

export type PageContentProps = {
  characters?: CharacterMeta[];
};

export function PageContent({ characters = [] }: PageContentProps) {
  return (
    <StoreProvider characters={characters}>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            原神
          </h1>
        </div>
        <Tabs defaultValue="image-text">
          <nav className="flex gap-4">
            <TabsList>
              <TabsTrigger value="text">文字</TabsTrigger>
              <TabsTrigger value="image-text">图文</TabsTrigger>
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
        </Tabs>
      </section>
    </StoreProvider>
  );
}
