import React from 'react';
import Tile from './Tile';
import { POSDocumentData } from '../types';
import LoadingDisplay from './LoadingDisplay';

interface Props{
    pos: POSDocumentData | null;
}

function DataDisplay({pos}: Props){
    return !pos ? <LoadingDisplay/> : (
        <figure className="p-8 border rounded bg-white h-full block divide-y">
            <div className=" grid grid-cols-2">
            <Tile count={pos.adjectives.length} name="Adjectives"/>
            <Tile count={pos.adverbs.length} name="Adverbs"/>
            <Tile count={pos.interjections.length} name="Interjections"/>
            <Tile count={pos.nouns.length} name="Nouns"/>
            <Tile count={pos.pronouns.length} name="Pronouns"/>
            <Tile count={pos.articles.length} name="Articles"/>
            <Tile count={pos.verbs.length} name="Verbs"/>
            <Tile count={pos.conjunctions.length} name="Conjunctions"/>
            <Tile count={pos.prepositions.length} name="Prepositions"/>
            </div>            
        </figure>
    )
}

export default DataDisplay