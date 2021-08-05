export interface POSResponse{
    values: POSDocument[];
}

export interface POSDocument{
    recordId: string;
    data: POSDocumentData;
}

export interface POSDocumentData{
    verbs: string[];
    adjectives: string[];
    adverbs: string[];
    nouns: string[];
    articles: string[];
    pronouns: string[];
    conjunctions: string[];
    interjections: string[];
    prepositions: string[];
}

export type POSState = POSResponse | null;