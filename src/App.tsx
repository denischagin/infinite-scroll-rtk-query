import {useGetCommentsQuery} from "./store/api";
import {Fragment, useEffect, useRef, useState} from "react";
import {IComment} from "./store/models";

function App() {
    const [pageNumber, setPageNumber] = useState(1)

    const observerElementRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const [commentsWithPagination, setCommentsWithPagination] = useState<IComment[]>([])

    const {data: comments, isFetching, isLoading} =
        useGetCommentsQuery({
            page: pageNumber
        })

    useEffect(() => {
        setCommentsWithPagination(prev => {
            return [...prev, ...comments ?? []]
        })
    }, [comments]);

    useEffect(() => {
        if (!observerElementRef.current) return
        if (isFetching || isLoading) return

        const callback: IntersectionObserverCallback = (entries,) => {
            if (entries[0].isIntersecting && pageNumber < 10 && comments?.length !== 0) {
                console.log('callback', comments)
                setPageNumber(prev => prev + 1)
            }
        };

        observerRef.current = new IntersectionObserver(callback);
        observerRef.current.observe(observerElementRef.current)

        return () => observerRef.current?.disconnect()
    }, [commentsWithPagination])

    return (
        <ul>
            {commentsWithPagination.map(({id, name, body}, index) => (
                <Fragment key={id}>
                    <li style={{marginTop: "50px"}}>
                        <h2>{name}</h2>
                        <p>{body}</p>
                    </li>
                    {commentsWithPagination.length - 2 === index && (
                        <div
                            ref={observerElementRef}
                        />
                    )}
                </Fragment>
            ))}
        </ul>
    )
}

export default App
