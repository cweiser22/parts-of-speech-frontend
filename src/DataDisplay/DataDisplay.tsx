import React from 'react'
import Tile from './Tile'
import { POSDocumentData } from '../types'

interface Props{
    valid: boolean;
    data: POSDocumentData;
}

function DataDisplay({valid, data}: Props){
    return !valid ? <h1>validating</h1> : (
        <figure className="p-8 border rounded bg-white h-full block divide-y">
            <div className=" grid grid-cols-2">
            <Tile count={data.adjectives.length} name="Adjectives"/>
            <Tile count={data.adverbs.length} name="Adverbs"/>
            <Tile count={data.interjections.length} name="Interjections"/>
            <Tile count={data.nouns.length} name="Nouns"/>
            <Tile count={data.pronouns.length} name="Pronouns"/>
            <Tile count={data.articles.length} name="Articles"/>
            <Tile count={data.verbs.length} name="Verbs"/>
            <Tile count={data.conjunctions.length} name="Conjunctions"/>
            <Tile count={data.prepositions.length} name="Prepositions"/>
            </div>            
        </figure>
    )
}

export default DataDisplay