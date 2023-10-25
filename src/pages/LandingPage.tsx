import { Link } from 'react-router-dom';
import './pages.css';

export const LandingPage = () => {
  return (
    <div className="landing-page-app">
      <div className="home-page-landing">
        <Link to="home" className="app-link">
          <div className="landing-page-title">מְשַׂחֲקִים וְלוֹמְדִים</div>
          <div className="app-title-centered">
            לְחַץ בָּעַכְבָּר אוֹ בָּאֶצְבַּע כְּדֵי לְהַתְחִיל
          </div>
          <div className="app-sub-title-centered">
            הַפְּעִילוּיוֹת שֶׁלָּנוּ עוֹבְדוֹת טוֹב יוֹתֵר עַל מָסַכִּים בֵּינוֹנִיִּים וּגְדוֹלִים
          </div>
        </Link>
      </div>
    </div>
  );
}
