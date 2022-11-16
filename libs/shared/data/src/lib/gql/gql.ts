/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query projectList {\n  projects {\n    id\n    name\n    __typename\n  }\n}": types.ProjectListDocument,
};

export function graphql(source: "query projectList {\n  projects {\n    id\n    name\n    __typename\n  }\n}"): (typeof documents)["query projectList {\n  projects {\n    id\n    name\n    __typename\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;