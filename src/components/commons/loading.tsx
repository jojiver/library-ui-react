import loadingImage from "@/assets/images/loading_2.gif";

export function PageLoading() {
  return (
    <section className="h-screen flex justify-center items-center flex-col gap-4">
      <img 
      src={loadingImage} alt="loadingImage" className="w-10 h-10" />
      Loading...
    </section>
  )
}