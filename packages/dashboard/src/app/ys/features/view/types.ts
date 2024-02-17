export type OwnershipFilter = "both" | "true" | "false";

export const DEFAULT_VIEW_STATE: ViewState = {
  ownershipFilter: "both",
} as const;

export type ViewState = {
  ownershipFilter: OwnershipFilter;
};
