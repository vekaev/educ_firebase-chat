import React, {useEffect, useState} from 'react';
import {db} from "./firebase";

export default function useCollection(path, orderBy) {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        const connection = db.collection(path);
        if( orderBy ) connection.orderBy(orderBy)
        connection.onSnapshot(snapshot => {
            const newDocs = []
            snapshot.forEach(doc => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                });
            })
            setDocs(newDocs)
        })
        return connection
    }, [])

    return docs
}
