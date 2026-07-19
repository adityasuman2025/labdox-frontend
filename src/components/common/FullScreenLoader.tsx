import Loader from "./Loader";

export default function FullScreenLoader() {
    return (
        <section className="h-screen w-full flex items-center justify-center">
            <Loader className="loading-lg text-primary" />
        </section>
    )
}