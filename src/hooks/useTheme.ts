import { useEffect, useState } from "react";

export default function useTheme(defaultTheme: string) {
    const [theme, setTheme] = useState(defaultTheme)

    const handleTheme = () => {
        document.getElementsByTagName('html')[0].setAttribute('data-theme', theme)
    }

    useEffect(() => {
        handleTheme()
    },[theme])

    return [theme, setTheme] as const
}