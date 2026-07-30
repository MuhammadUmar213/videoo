import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import { platforms } from "./data/site";

// Home ships in the initial bundle because it is the landing route; everything
// else is fetched on demand so the first paint stays small.
const Downloader = lazy(() => import("./pages/Downloader"));
const Tools = lazy(() => import("./pages/Tools"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const DMCA = lazy(() => import("./pages/DMCA"));
const Contact = lazy(() => import("./pages/Contact"));
const PlatformLanding = lazy(() => import("./pages/PlatformLanding"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const Pricing = lazy(() => import("./pages/Pricing"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-white">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/download" element={<Downloader />} />
                <Route path="/tools" element={<Tools />} />
                {platforms.map((platform) => (
                  <Route
                    key={platform.path}
                    path={platform.path}
                    element={<PlatformLanding platform={platform} />}
                  />
                ))}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/terms-and-conditions" element={<Terms />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/dmca-copyright-policy" element={<DMCA />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
