import { type ReactNode } from "react"
import { logout } from "../../utils/api";
import TextLink from "./TextLink";

interface LayoutProps {
    header: ReactNode | string;
    children: ReactNode | string;
}
export default function Layout({ header, children }: LayoutProps) {
    return (
        <section className="h-screen bg-base-100 flex flex-col">
            <header className="w-full h-14 bg-neutral flex justify-between items-center px-4 box-border">
                <span className="text-base-300 font-bold">{header}</span>
                <TextLink linkText="logout" linkClassName="text-base-200" onClick={logout} />
            </header>
            <main className="box-border p-4 md:p-10 flex-1 w-full overflow-auto">{children}</main>
        </section>
    )
}