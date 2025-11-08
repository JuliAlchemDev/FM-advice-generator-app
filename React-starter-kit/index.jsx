const { useState, useEffect } = React;

export const App = () => {
  const [advice, setAdvice] = useState({});
  const { id, quotation } = advice;

  const fetchAdvice = async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setAdvice({
        id: data.slip.id,
        quotation: data.slip.advice,
      });
    } catch (err) {
      console.error("No data has been fetched...", err);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const getNewAdvice = () => {
    fetchAdvice();
  };

  // Monitor picture source changes on resize 
  useEffect(()=> {
    const pictureSource = document.querySelector('.advice-generator-card__divider');

    const handleResize = () => {
      console.log("Current image: ", pictureSource.currentSrc);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  },[]);





  return (
    <main className="advice-generator-card">
      <section className="advice-generator-card__text">
        <h1 className="advice-generator-card__text-title">Advice #{id}</h1>
        <q className="advice-generator-card__text-quotation">{quotation}</q>
      </section>

      <picture>
        <source
          srcSet="./assets/images/pattern-divider-desktop.svg"
          media="(min-width: 48rem)"
        />
        <img
          src="./assets/images/pattern-divider-mobile.svg"
          alt=""
          width="295"
          height="16"
          className="advice-generator-card__divider"
        />
      </picture>

      <button className="advice-generator-card__button" onClick={getNewAdvice}>
        <img
          src="./assets/images/icon-dice.svg"
          alt=""
          width="24"
          height="24"
          className="advice-generator-card__button-img"
        />
      </button>
    </main>
  );
};
