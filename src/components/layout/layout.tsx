import Navbar from "./navbar"
import Footer from "./footer"
import ProvidersWrapper from "../auth/providersWrapper";

interface IProps {
    children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <Navbar />
            <div className="w-full h-[72px]"></div>
                <ProvidersWrapper>
                    {children}
                </ProvidersWrapper>
            <Footer />
        </>
    )
}
