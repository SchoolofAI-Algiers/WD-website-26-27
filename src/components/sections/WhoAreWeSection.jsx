
import "./WhoAreWeSection.css";
import spidermanImage from "../../assets/spiderman.png"; // adjust path to your image
import groupPhotoOne from "../../assets/group-photo-1.png";
import groupPhotoTwo from "../../assets/group-photo-2.png";

const WhoAreWeSection = ({ containerStyle }) => {
  return (
    <section
      id="who-are-we"
      className="who-are-we-section"
      style={containerStyle}
    >
      <div className="who-are-we-section__left">
        <h2 className="who-are-we-section__title">
          Who Are{" "}
          <span style={{ color: `rgb(255, 206, 5)` }}>We?</span>
        </h2>

        <div className="who-are-we-section__text">
          <p>
            School of AI Algiers (SOAI) is a student club at ESI for anyone
            interested in artificial intelligence and data science. Since 2019,
            we've been bringing together students who want to learn more about
            AI, try new things, and share what they know with others.
          </p>
          <p>
            Whether you're already familiar with AI or just starting to
            discover it, there's a place for you here.
          </p>
          <p>
            We organize workshops, conferences, challenges, and events like AI
            Day and AI Summit, giving students the chance to learn, work on
            ideas, meet other passionate people, and simply explore what AI has
            to offer.
          </p>
        </div>

        <p className="who-are-we-section__tagline">
          Same campus. Same dreams. One community.
        </p>

        <div className="who-are-we-section__photos">
          <img
            className="who-are-we-section__photo who-are-we-section__photo-one"
            src={groupPhotoOne}
            alt="SOAI members group photo"
          />
          <img
            className="who-are-we-section__photo who-are-we-section__photo-two"
            src={groupPhotoTwo}
            alt="SOAI community group photo"
          />
        </div>
      </div>

      <div className="who-are-we-section__right">
        <img className="spider-man-image" src={spidermanImage} alt="" />
      </div>
    </section>
  );
};

export default WhoAreWeSection;