import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum Players {
  O = "O",
  X = "X"
}



type EagerUntitledModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UntitledModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerX: string;
  readonly playerO?: string | null;
  readonly map: string;
  readonly currentPlayer: Players | keyof typeof Players;
  readonly pointsX?: number | null;
  readonly pointsO?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUntitledModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UntitledModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly playerX: string;
  readonly playerO?: string | null;
  readonly map: string;
  readonly currentPlayer: Players | keyof typeof Players;
  readonly pointsX?: number | null;
  readonly pointsO?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UntitledModel = LazyLoading extends LazyLoadingDisabled ? EagerUntitledModel : LazyUntitledModel

export declare const UntitledModel: (new (init: ModelInit<UntitledModel>) => UntitledModel) & {
  copyOf(source: UntitledModel, mutator: (draft: MutableModel<UntitledModel>) => MutableModel<UntitledModel> | void): UntitledModel;
}