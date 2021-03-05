import {useEffect, useState} from 'react';
import {db} from "../firebase";

export default function useCollection(path, orderBy) {
    const [docs, setDocs] = useState([])

    useEffect(() => {
        let collection = db.collection(path);
        if( orderBy ) collection = collection.orderBy(orderBy)
        return collection.onSnapshot(snapshot => {
            const newDocs = []
            snapshot.forEach(doc => {
                newDocs.push({
                    ...doc.data(),
                    id: doc.id
                });
            })
            setDocs(newDocs)
        })
    }, [path, orderBy])

    return docs
}
