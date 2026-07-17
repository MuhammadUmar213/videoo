import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Downloader from "./pages/Downloader";
import Tools from "./pages/Tools";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import DMCA from "./pages/DMCA";
import Contact from "./pages/Contact";
import PlatformLanding from "./pages/PlatformLanding";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import Pricing from "./pages/Pricing";
import { blogPosts, platforms } from "./data/site";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
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
            <Route
              path="/blog/how-to-download-youtube-videos-legally"
              element={
                <BlogPost slug="how-to-download-youtube-videos-legally" />
              }
            />
            {blogPosts.slice(1).map((post) => (
              <Route
                key={post.slug}
                path={`/blog/${post.slug}`}
                element={<BlogPost slug={post.slug} />}
              />
            ))}
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
