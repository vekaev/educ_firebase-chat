import {useEffect, useState} from "react";
import {db} from "../firebase";

const cache = {};
const pendingCache = {};

export default function useDocWithCache(path) {
    const [doc, setDoc] = useState(cache[path]);

    useEffect(() => {
        if (doc || !path) return

        let stillMounted = true
        const pending = pendingCache[path]
        const promise = pending || (pendingCache[path] = db.doc(path).get())

        promise.then(doc => {
            if (stillMounted) {
                const user = {
                    ...doc.data(),
                    id: doc.id
                }
                setDoc(user)
                cache[path] = user
            }
        });

        return () => {
            stillMounted = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    return doc
}
