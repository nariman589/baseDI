import { useEffect, useRef, useState } from "react"

export function useClickOutside() {
	const ref = useRef<any>(null)
	const [state, setState] = useState<any>(false)
	useEffect(() => {
		function handleClickOutside(event: any) {
			if (ref.current && !ref.current.contains(event.target)) {
				setState(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [ref])
	return [state, setState, ref]
}
