import { Link } from 'react-router-dom';
import './pages.css';

export const LandingPage = () => {
  return (
    <div className="home-page-app">
      <div className="home-page-landing">
        <Link to="home" className="app-link">
          <div className="landing-page-title">מְשַׂחֲקִים וְלוֹמְדִים</div>
          <div className="app-title-centered">
            לְחַץ בָּעַכְבָּר אוֹ בָּאֶצְבַּע כְּדֵי לְהַתְחִיל
          </div>
        </Link>
      </div>
    </div>
  );
}
