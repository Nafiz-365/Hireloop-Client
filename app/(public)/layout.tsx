import { Navbar } from "@/components/layout/Navbar"

/* Public shell: sticky navbar + page content. Auth pages (/login, /signup)
   live inside (auth) within this group — same layout, no footer (Footer is
   rendered only by the homepage). */
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Sticky navbar - in document flow so every page reserves its space */}
      <div className="sticky top-0 z-30 pt-4 sm:pt-6">
        <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-10 xl:px-15">
          <Navbar />
        </div>
      </div>
      {children}
    </>
  )
}
