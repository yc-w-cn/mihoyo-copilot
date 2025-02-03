import { isArray } from "lodash"
import { RelicsetMeta } from "../features/relicsets/types"
import { useMemo } from "react";
import { useAppSelector } from "../hooks";
import Image from "next/image";
import { cn } from "@/utils";

interface Props {
  relicsets: RelicsetMeta[]
}
export function RelicsetsPanel({ relicsets }: Props) {
  const charactersValue = useAppSelector((state) => state.characters.values);

  const characters = useMemo(
    () => Object.values(charactersValue),
    [charactersValue]
  );

  if (!isArray(relicsets)) return <></>

  return <table className="mt-5 table-auto">
    <thead>
      <tr className="leading-loose">
        <th>遗器</th>
        <th>角色</th>
        <th>躯干</th>
        <th>脚部</th>
        <th>位面球</th>
        <th>连结绳</th>
        <th>副词条</th>
      </tr>
    </thead>
    <tbody>
      {relicsets.map((relicset, relicsetIdx) => {
        const availableCharacters = characters.filter(
          character => character.detail.recommend.隧洞遗器.includes(relicset.name)
            || character.detail.recommend.位面饰品.includes(relicset.name))

        if (availableCharacters.length === 0) {
          return (<tr className={cn("text-xs", relicsetIdx % 2 === 0 && "bg-slate-100")}>
            <td rowSpan={availableCharacters.length || undefined}
              className="p-4">
              <Image
                width={256}
                height={349}
                src={relicset.image}
                alt={relicset.name}
                className="rounded-md object-cover w-[100px]"
                priority
              /><span className="font-bold text-center">{relicset.name}</span>
            </td>
            <td className="p-4">-</td>
            <td className="p-4">-</td>
            <td className="p-4">-</td>
            <td className="p-4">-</td>
            <td className="p-4">-</td>
            <td className="p-4">-</td>
          </tr>)
        }


        return availableCharacters.map((character, index) => {
          const isPlanarOrnaments = character.detail.recommend.位面饰品.includes(relicset.name)
          return (
            <tr key={character.name} className={cn("text-xs", relicsetIdx % 2 === 0 && "bg-slate-100")}>
              {index === 0 && <td rowSpan={availableCharacters.length || undefined}
                className="p-4">
                <Image
                  width={256}
                  height={349}
                  src={relicset.image}
                  alt={relicset.name}
                  className="rounded-md object-cover w-[100px]"
                  priority
                /><span className="font-bold text-center">{relicset.name}</span>
              </td>}
              <td className="p-4">{character.name}</td>
              <td className="p-4">{!isPlanarOrnaments ? renderTexts(character.detail.recommend.主词条推荐.躯干) : "-"}</td>
              <td className="p-4">{!isPlanarOrnaments ?renderTexts(character.detail.recommend.主词条推荐.脚部) : "-"}</td>
              <td className="p-4">{isPlanarOrnaments ? renderTexts(character.detail.recommend.主词条推荐.位面球) : "-"}</td>
              <td className="p-4">{isPlanarOrnaments ? renderTexts(character.detail.recommend.主词条推荐.连结绳) : "-"}</td>
              <td className="p-4">{renderTexts(character.detail.recommend.副词条推荐)}</td>
            </tr>)
        })
      })}
    </tbody>
  </table>
}

function renderTexts(texts: string[]) {
  return <div className="flex flex-col">
    {texts.map((item, index) => <span key={`item-${index}`}>{item}</span>)}
  </div>
}