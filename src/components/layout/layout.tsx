import Navbar from "./navbar"
import Footer from "./footer"

interface IProps {
    children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <Navbar />
            <div className="w-full h-[72px]"></div>
                    {children}
            <Footer />
        </>
    )
}
